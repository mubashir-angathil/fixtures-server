import { $Enums } from "@prisma/client";
import { CreateAddressDto, PlaceOrderDto, PlaceOrderItemType, RemoveProductFromCartDto } from "../configs/dtos/request/user.request.dto";
import { AddProductToCartInterface, CreateAddressInterface, UpdateAddressInterface } from "../configs/interfaces/common.interfaces";
import prisma from "../prisma/prisma"

class UserServices {
    public addProductToCart = async ({ userId, productId, quantity, variantId }: AddProductToCartInterface) => {
        const transaction = await prisma.$transaction(async (prisma) => {
            // Find or create the cart
            let cart = await prisma.cart.findUnique({
                where: { userId }
            });

            if (!cart) {
                cart = await prisma.cart.create({
                    data: { userId }
                });
            }

            // Upsert the cart item
            const item = await prisma.cartItem.upsert({
                where: {
                    cartIdVariantId: {
                        cartId: cart.id,
                        variantId
                    }
                },
                update: {
                    quantity: {
                        increment: quantity
                    },
                },
                create: {
                    productId,
                    quantity,
                    variantId,
                    totalPrice: await this.calculateTotalProductPrice(productId, variantId, quantity),
                    cartId: cart.id
                }
            });

            if (item.quantity <= 0) {
                await prisma.cartItem.delete({
                    where: {
                        cartIdVariantId: {
                            cartId: cart.id,
                            variantId
                        }
                    }
                })
                return { cart, deleted: true }
            } else if (quantity !== item.quantity) {
                await prisma.cartItem.update({
                    where: { id: item.id },
                    data: { totalPrice: await this.calculateTotalProductPrice(productId, variantId, item.quantity) }
                })
            }

            return { cart };
        });

        return transaction;
    }

    public removeProductFromCart = async ({ productId, variantId, cartId }: RemoveProductFromCartDto) => {
        try {
            return await prisma.cartItem.delete({
                where: {
                    productId,
                    cartIdVariantId: {
                        cartId,
                        variantId
                    }
                }
            })
        } catch (error) {
            throw error
        }
    }

    public getUserCart = async ({ userId }: { userId: string }) => {
        try {
            return prisma.$transaction(async (prisma) => {
                const cart = await prisma.cart.findUnique({
                    where: { userId },
                    select: {
                        id: true,
                        userId: true,
                        createdAt: true,
                        updatedAt: true,
                        items: true
                    }
                })
                if (!cart) throw new Error("Cart is not found")

                cart.items = await Promise.all(cart.items.map(async (item) =>
                    await prisma.cartItem.update({
                        where: {
                            id: item.id
                        },
                        data: {
                            totalPrice: await this.calculateTotalProductPrice(item.productId, item.variantId, item.quantity)
                        },
                    })
                ))
                if (cart.items.length > 0) {
                    const totalAmount = cart.items.reduce((total, currentValue) => {
                        return total + currentValue.totalPrice
                    }, 0)
                    return { ...cart, totalAmount }
                }

                return { ...cart, totalAmount: 0 }
            })

        } catch (error) {
            throw error
        }
    }

    public placeOrder = async ({ data, userId, cartId }: { data: PlaceOrderDto, userId: string, cartId?: string }) => {
        try {
            return await prisma.$transaction(async (prisma) => {

                await this.updateProductStock(data.items)

                const prepareOrder = await this.prepareOrder(data.items)

                const order = await prisma.order.create({
                    data: {
                        userId,
                        addressId: data.addressId,
                        totalAmount: prepareOrder.totalAmount,
                        items: {
                            createMany: {
                                data: prepareOrder.items
                            }
                        }
                    },
                    include: {
                        items: true
                    }
                })

                if (cartId && order) {
                    const deleteCartItems = await prisma.cartItem.deleteMany({
                        where: {
                            cartId,
                            variantId: { in: data.items.map((variant) => variant.variantId) }
                        }
                    })
                    if (deleteCartItems.count === 0) throw new Error("Cart is empty")
                }

                return order
            })

        } catch (error) {
            throw error
        }
    }

    public cancelOrder = async ({ orderId, userId }: { orderId: string, userId: string }) => {
        try {

            return await prisma.order.update({
                where: {
                    id: orderId,
                    userId,
                    cancelled: false,
                    status: { not: "Shipped" }
                },
                data: {
                    cancelled: true,
                    items: {
                        updateMany: {
                            where: {
                                orderId
                            },
                            data: {
                                cancelled: true
                            }
                        }
                    }
                }
            })

        } catch (error) {
            throw error
        }
    }

    public getOrders = async ({ userId, status }: { userId: string, status?: $Enums.Status[] }) => {
        try {
            return await prisma.order.findMany({
                where: {
                    userId,
                    status: {
                        in: status
                    }
                },
                select: {
                    _count: true,
                    cancelled: true,
                    id: true,
                    items: true,
                    status: true,
                    totalAmount: true
                }
            })
        } catch (error) {
            throw error
        }
    }

    public createAddress = async (address: CreateAddressInterface) => {
        try {
            return await prisma.address.create({
                data: address
            })
        } catch (error) {
            throw error
        }
    }

    public updateAddress = async ({ addressId, userId, ...data }: UpdateAddressInterface) => {
        try {
            return await prisma.address.update({
                where: { id: addressId, userId },
                data
            })
        } catch (error) {
            throw error
        }
    }

    private calculateTotalProductPrice = async (productId: string, productVariantId: string, quantity: number): Promise<number> => {
        try {
            const productVariant = await prisma.productVariant.findUnique({
                where: {
                    id: productVariantId,
                    productId
                },
                include: { product: true }
            })
            if (!productVariant) throw new Error("Product variant not found !!");

            const price = productVariant.optionalPrice !== null ? productVariant.optionalPrice : productVariant.product.commonPrice
            const totalPrice = price * quantity

            return totalPrice;
        } catch (error) {
            throw error
        }
    }

    private updateProductStock = async (products: PlaceOrderItemType[]) => {
        try {
            for (const product of products) {
                const productDetails = await prisma.productVariant.findUnique({
                    where: {
                        id: product.variantId,
                        productId: product.productId
                    }
                });

                if (!productDetails) {
                    throw new Error(`Product variant not found for product ID ${product.productId} and variant ID ${product.variantId}`);
                }

                const { quantity } = productDetails;
                const quantitySold = product.quantity;

                if (quantity < quantitySold) {
                    throw new Error(`Insufficient stock for product ID ${product.productId} and variant ID ${product.variantId}`);
                }

                return await prisma.productVariant.update({
                    where: {
                        productId: product.productId,
                        id: product.variantId
                    },
                    data: {
                        quantity: {
                            decrement: quantitySold
                        }
                    }
                });
            }
        } catch (error) {
            throw error
        }
    };

    private prepareOrder = async (orderItems: PlaceOrderDto["items"]) => {
        try {
            const newOrderItems = []
            let totalAmount = 0
            for (const item of orderItems) {
                const productVariant = await prisma.product.findUnique({
                    where: {
                        id: item.productId,
                    },
                    select: {
                        commonPrice: true,
                        variants: {
                            where: {
                                id: item.variantId,
                                productId: item.productId
                            }
                        }
                    }
                })

                if (!productVariant) {
                    throw new Error(`Product variant not found for product ID ${item.productId} and variant ID ${item.variantId}`);
                }


                const unitPrice = productVariant.variants[0].optionalPrice ?? productVariant.commonPrice
                const quantity = item.quantity

                newOrderItems.push({
                    ...item,
                    unitPrice
                });

                totalAmount += unitPrice * quantity
            }

            const order = {
                totalAmount,
                items: newOrderItems
            }

            return order
        } catch (error) {
            throw error
        }
    }
}
export default UserServices