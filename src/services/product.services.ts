import { CreateProductDto, UpdateProductDto } from "../configs/dtos/request/admin.request.dto";
import { CreateReviewInterface, PaginationInterface, ReactionInterface, RemoveReviewInterface, UpdateReviewInterface } from "../configs/interfaces/common.interfaces";
import prisma from "../prisma/prisma";
import { PrismaClient, Reactions } from "@prisma/client";

class ProductServices {

    public createProduct = async (product: CreateProductDto, vendorId: string) => {
        try {

            const validateCategoryId = await this.checkIsIdExist(
                product.categoryId,
                prisma.category,
                "Foreign key constraint error (categoryId doesn't exist)!!")
            if (validateCategoryId) return await prisma.product.create({ data: { ...product, vendorId } })

        } catch (error) {
            throw error
        }
    };

    public updateProduct = async (product: UpdateProductDto, productId: string, vendorId: string) => {
        try {
            if (product?.categoryId) {
                await this.checkIsIdExist(
                    product.categoryId,
                    prisma.category,
                    "Foreign key constraint error (categoryId doesn't exist)!!");
            }
            return await prisma.product.update({
                data: product, where: {
                    id: productId,
                    vendorId
                }
            })
        } catch (error) {
            throw error
        }
    };

    public getAllProducts = async ({ limit, offset }: PaginationInterface) => {
        try {
            return await prisma.$transaction([prisma.product.count(), prisma.product.findMany({
                skip: offset,
                take: limit,
            })])

        } catch (error) {
            throw error
        }
    };

    public getProductById = async (productId: string) => {
        try {
            return await prisma.product.findUnique({
                where: { id: productId },
            })
        } catch (error) {
            throw error
        }
    };

    public deleteProduct = async (productId: string, vendorId: string) => {
        try {
            return await prisma.product.delete({
                where: {
                    id: productId,
                    vendorId
                }
            })
        } catch (error) {
            throw error
        }
    };

    public createProductReview = async ({ rating, review, productId, reviewerId, images }: CreateReviewInterface) => {
        try {
            const verifiedBuyer = await prisma.order.findFirst({
                where: {
                    userId: reviewerId,
                    cancelled: false,
                    items: {
                        some: {
                            productId,
                            cancelled: false
                        }
                    }
                }
            })

            return await prisma.productReview.create({
                data: {
                    rating,
                    review,
                    reviewerId,
                    productId,
                    images,
                    verified: Boolean(verifiedBuyer)
                }
            })
        } catch (error) {
            throw error
        }
    };

    public updateProductReview = async ({ rating, review, reviewId, reviewerId, images }: UpdateReviewInterface) => {
        try {
            return await prisma.productReview.update({
                where: {
                    id: reviewId,
                },
                data: {
                    rating,
                    review,
                    reviewerId,
                    images,
                }
            })
        } catch (error) {
            throw error
        }
    };

    public removeProductReview = async ({ reviewId, reviewerId }: RemoveReviewInterface) => {
        try {
            return await prisma.$transaction([
                prisma.reaction.deleteMany({
                    where: {
                        reviewId
                    }
                }),
                prisma.productReview.delete({
                    where: {
                        id: reviewId,
                        reviewerId
                    }
                })
            ])
        } catch (error) {
            throw error
        }
    };

    public reactToProductReview = async (reactionData: ReactionInterface) => {
        try {
            const { reaction, reviewId, authorId } = reactionData;

            await this.checkIsIdExist(reviewId, prisma.productReview, "Foreign Key constraint error, review not found!!")

            const existingReaction = await prisma.reaction.findFirst({
                where: {
                    reviewId,
                    authorId
                }
            });

            if (!existingReaction && reaction) {
                return prisma.reaction.create({
                    data: {
                        reaction,
                        authorId,
                        reviewId
                    }
                });
            } else if (existingReaction && reaction) {
                return prisma.reaction.update({
                    where: {
                        id: existingReaction.id
                    },
                    data: {
                        reaction
                    }
                });
            } else if (existingReaction && reaction === undefined) {
                return prisma.reaction.delete({
                    where: {
                        id: existingReaction.id
                    }
                });
            }

            throw new Error("Reaction not found")
        } catch (error) {
            throw error
        }
    }

    public getProductReviews = async (productId: string, { limit, offset }: PaginationInterface) => {
        try {
            return await prisma.$transaction([
                prisma.productReview.count(),
                prisma.productReview.findMany({
                    where: {
                        productId
                    },
                    include: { reactions: true },
                    orderBy: { createdAt: "desc" },
                    skip: offset,
                    take: limit,
                })
            ])
        } catch (error) {
            throw error
        }
    }

    private checkIsIdExist = async (id: string, model: any, message: string) => {
        try {
            const isIdExist = await model.findUnique({ where: { id } })
            if (!isIdExist) throw new Error(message)

            return true
        } catch (error) {
            throw error
        }
    }
}
export default ProductServices;