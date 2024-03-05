import { $Enums } from "@prisma/client";
import { CreateAddressDto, PlaceOrderDto, RemoveProductFromCartDto } from "../configs/dtos/request/user.request.dto";
import { CreateAddressInterface, PlaceOrderItemInterface, UpdateAddressInterface } from "../configs/interfaces/common.interfaces";
import prisma from "../prisma/prisma"

class UserServices {
    public addProductToCart = async ({ userId, productId, quantity }: { userId: string, productId: string, quantity: number }) => {
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
                    cartIdProductId: {
                        cartId: cart.id,
                        productId: productId
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
                    totalPrice: await this.calculateTotalProductPrice(productId, quantity),
                    cartId: cart.id
                }
            });

            if (item.quantity <= 0) {
                await prisma.cartItem.delete({
                    where: {
                        cartIdProductId: { cartId: cart.id, productId }
                    }
                })
                return { cart, deleted: true }
            } else if (quantity !== item.quantity) {
                await prisma.cartItem.update({
                    where: { id: item.id },
                    data: { totalPrice: await this.calculateTotalProductPrice(productId, item.quantity) }
                })
            }

            return { cart };
        });

        return transaction;
    }

    public removeProductFromCart = async ({ productId, cartId }: RemoveProductFromCartDto) => {
        try {
            return await prisma.cartItem.delete({
                where: {
                    cartIdProductId: { cartId, productId },
                }
            })
        } catch (error) {
            throw error
        }
    }

    public getUserCart = async ({ userId }: { userId: string }) => {
        try {
            return await prisma.cart.findUnique({
                where: { userId },
                select: {
                    id: true,
                    userId: true,
                    createdAt: true,
                    updatedAt: true,
                    items: true
                }
            })
        } catch (error) {
            throw error
        }
    }

    public placeOrder = async ({ data, userId }: { data: PlaceOrderDto, userId: string }) => {
        try {

            return await prisma.order.create({
                data: {
                    userId,
                    addressId: data.addressId,
                    totalAmount: data.totalAmount,
                    items: {
                        createMany: {
                            data: data.items
                        }
                    }
                }
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

    private calculateTotalProductPrice = async (productId: string, quantity: number): Promise<number> => {
        try {
            const product = await prisma.product.findUnique({ where: { id: productId } })
            if (!product) throw new Error("Product not found !!");

            const totalPrice = product.price * quantity;

            return totalPrice;
        } catch (error) {
            throw error
        }
    }
}
export default UserServices