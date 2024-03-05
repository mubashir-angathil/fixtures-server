import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../configs/constants/statusCode.constants";
import services from "../services/services";
import { RequestWithUser } from "../configs/interfaces/common.interfaces";
import { Status } from "@prisma/client";

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
    };

    public updateOrderStatusController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const vendorId = req.user?.id
        const status = req.query.status as Status
        const orderId = req.params?.orderId

        if (!vendorId) throw next({ message: "authorId is missing!" })
        if (!orderId) throw next({ message: "orderId is missing!" })
        

        const order = await this.services.adminServices.UpdateOrderStatus({ orderId, status })

        if (!order) throw next({ message: "Order status updates failed!!" });

        res.status(HTTP_STATUS_CODES.OK).json({
            success: true,
            message: "Order status updated successful!!",
        })
    };
}
export default AdminController