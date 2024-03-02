import prisma from "../prisma/prisma"

class UserServices {
    public addProductToCart = async ({ userId, productId, quantity }: { userId: string, productId: string, quantity: number }) => {
        const transaction = await prisma.$transaction(async (prisma) => {
            // Find or create the cart
            let cart = await prisma.cart.findUnique({ where: { userId } });

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

            if (quantity !== item.quantity) {
                await prisma.cartItem.update({
                    where: { id: item.id },
                    data: { totalPrice: await this.calculateTotalProductPrice(productId, item.quantity) }
                })
            }

            return cart;
        });

        return transaction;
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