import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../configs/constants/statusCode.constants";
import services from "../services/services";
import { RequestWithUser } from "../configs/interfaces/common.interfaces";

class AdminController {
    private services = services;

    public createPromotionController = async (req: Request, res: Response) => {
        const promotion = await this.services.indexServices.createPromotion(req.body);

        res.status(HTTP_STATUS_CODES.CREATED).json({
            success: true,
            message: "Promotion created successfully",
            data: promotion
        });
    };

    public createProductController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const vendorId = req.user?.id

        if (!vendorId) throw next({ message: "authorId is missing!" })

        const product = await this.services.productServices.createProduct(req.body, vendorId)
        res.status(HTTP_STATUS_CODES.CREATED).json({
            success: true,
            message: "Product created successfully",
            data: product
        });
    };

    public updateProductController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const vendorId = req.user?.id
        const productId = req.params?.productId

        if (!vendorId) throw next({ message: "authorId is missing!" })
        if (!productId) throw next({ message: "productId is missing!" })


        const newProduct = await this.services.productServices.updateProduct(req.body, productId, vendorId)

        res.status(HTTP_STATUS_CODES.OK).json({
            success: true,
            message: "Product details updated successfully!!",
            data: newProduct
        })
    };

    public deleteProductController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const vendorId = req.user?.id
        const productId = req.params?.productId

        if (!vendorId) throw next({ message: "authorId is missing!" })
        if (!productId) throw next({ message: "productId is missing!" })


        const newProduct = await this.services.productServices.deleteProduct(productId, vendorId)

        if (!newProduct) throw next({ message: "Product deletion failed!!" });

        res.status(HTTP_STATUS_CODES.OK).json({
            success: true,
            message: "Product deletion successful!!",
        })
    }
}
export default AdminController