import { CreateProductDto, UpdateProductDto } from "../configs/dtos/request/admin.request.dto";
import { PaginationInterface } from "../configs/interfaces/common.interfaces";
import prisma from "../prisma/prisma";
import { PrismaClient } from "@prisma/client";

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
            return await prisma.product.findUnique({ where: { id: productId } })
        } catch (error) {
            throw error
        }
    };

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