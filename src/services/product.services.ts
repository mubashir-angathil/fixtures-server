import { CreateProductDto } from "../configs/dtos/request/admin.request.dto";
import prisma from "../prisma/prisma";

class ProductServices {
    public createProduct = async (product: CreateProductDto, vendorId: string) => {
        try {
            return await prisma.product.create({ data: { ...product, vendorId } })
        } catch (error) {
            throw error
        }
    }
}
export default ProductServices;