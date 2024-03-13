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

        if (!vendorId) throw next({ message: "AuthorId is missing!" })

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

    public createProductVariantController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const vendorId = req.user?.id
        const productId = req.params?.productId

        if (!vendorId) throw next({ message: "Author id is missing!" })
        if (!productId) throw next({ message: "Product id is missing!" })

        const productVariant = await this.services.productServices.createProductVariant({ variant: req.body, productId, vendorId })

        res.status(HTTP_STATUS_CODES.CREATED).json({
            success: true,
            message: "Product variant creation successfully",
            data: productVariant
        });
    };

    public updateProductVariantController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const vendorId = req.user?.id
        const { productId, variantId } = req.params

        if (!vendorId) throw next({ message: "Author id is missing!" })
        if (!productId) throw next({ message: "Product id is missing!" })
        if (!variantId) throw next({ message: "Variant id is missing!" })

        const productVariant = await this.services.productServices.updateProductVariant({ variant: req.body, variantId, productId, vendorId })

        res.status(HTTP_STATUS_CODES.OK).json({
            success: true,
            message: "Product variant updates successful",
            data: productVariant
        });
    };

    public deleteProductVariantController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const vendorId = req.user?.id
        const { productId, variantId } = req.params

        if (!vendorId) throw next({ message: "Author id is missing!" })
        if (!productId) throw next({ message: "Product id is missing!" })
        if (!variantId) throw next({ message: "Variant id is missing!" })

        const productVariant = await this.services.productServices.deleteProductVariant({ variantId, productId, vendorId })

        res.status(HTTP_STATUS_CODES.OK).json({
            success: true,
            message: "Product variant deleted successfully",
            data: productVariant
        });
    }

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

    public replayToProductReviewController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const reviewId = req.params?.reviewId
        const authorId = req.user?.id

        if (!reviewId) throw next({ message: "Review id is missing!!" })
        if (!authorId) throw next({ message: "Admin id is missing!!" })

        const replay = await this.services.productServices.replayToProductReview({ authorId, reviewId, ...req.body })

        if (!replay) throw next({ message: "Operation failed, can't replay!! try again" })

        res.status(HTTP_STATUS_CODES.CREATED).json({
            success: true,
            message: "You are replied successfully",
            data: replay
        })

    }

    public deleteReviewReplayController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const { reviewId, replayId } = req.params
        const authorId = req.user?.id

        if (!reviewId) throw next({ message: "Review id is missing!!" })
        if (!authorId) throw next({ message: "Admin id is missing!!" })

        const replay = await this.services.productServices.deleteReviewReplay({ authorId, reviewId, replayId })

        if (!replay) throw next({ message: "Replay deletion failed" })

        res.status(HTTP_STATUS_CODES.OK).json({
            success: true,
            message: "Replay deleted successfully",
        })

    }

    public createProductQAController = async (req: Request, res: Response, next: NextFunction) => {
        const { productId } = req.params

        if (!productId) throw next({ message: "Product id is missing!!" })

        const qa = await this.services.productServices.createProductQA({ ...req.body, productId })

        if (!qa) throw next({ message: "Failed to create Q&A" })

        res.status(HTTP_STATUS_CODES.CREATED).json({
            success: true,
            message: "Product Q&A created successfully",
            data: qa
        })
    }

    public updateProductQAController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const { productId, qaId } = req.params
        const authorId = req.user?.id

        if (!authorId) throw next({ message: "Admin id is missing!!" })
        if (!productId) throw next({ message: "Product id is missing!!" })
        if (!qaId) throw next({ message: "Q&A id is missing!!" })

        const qa = await this.services.productServices.updateProductQA({ ...req.body, productId, qaId, authorId })

        if (!qa) throw next({ message: "Failed to update Q&A" })

        res.status(HTTP_STATUS_CODES.CREATED).json({
            success: true,
            message: "Product Q&A updated successfully",
            data: qa
        })
    }

    public answerToQuestionController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const { productId, qaId } = req.params
        const authorId = req.user?.id

        if (!productId) throw next({ message: "Product id is missing!!" })
        if (!qaId) throw next({ message: "Q&A id is missing!!" })

        const answer = await this.services.productServices.answerToQuestion({ ...req.body, qaId, productId, authorId })

        if (!answer) throw next({ message: "Failed to create answer" })

        res.status(HTTP_STATUS_CODES.CREATED).json({
            success: true,
            message: "Answered successfully",
            data: answer
        })
    }

    public deleteProductQaController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const { productId, qaId } = req.params
        const authorId = req.user?.id

        if (!authorId) throw next({ message: "Admin id is missing!!" })
        if (!productId) throw next({ message: "Product id is missing!!" })
        if (!qaId) throw next({ message: "Q&A id is missing!!" })

        const qa = await this.services.productServices.deleteProductQa({ qaId, productId, authorId })

        if (!qa) throw next({ message: "Failed to remove Q&A" })

        res.status(HTTP_STATUS_CODES.CREATED).json({
            success: true,
            message: "Q&A removed successfully",
            data: qa
        })
    }
}
export default AdminController