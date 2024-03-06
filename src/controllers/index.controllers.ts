import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../configs/constants/statusCode.constants";
import services from "../services/services";
import PaginationHelpers from "../utils/paginationHelpers";

class IndexControllers {
    private services = services;
    private paginationHelpers = new PaginationHelpers()

    public getPromotionsController = async (req: Request, res: Response) => {
        const promotions = await this.services.indexServices.getPromotions();

        res.status(HTTP_STATUS_CODES.OK).json({
            success: true,
            message: "Promotions fetched successfully",
            data: promotions
        });

    };

    public getAllProductController = async (req: Request, res: Response, next: NextFunction) => {
        const page = req.query.page;
        const limit = req.query.limit;
        const pagination = this.paginationHelpers.getCurrentPagination({ limit, page })

        const [count, products] = await this.services.productServices.getAllProducts(pagination)

        if (!products) throw next({ message: "Oops!! Products fetching failed." })

        res.status(HTTP_STATUS_CODES.OK).json({
            success: true,
            message: "Products fetched successfully",
            data: products,
            totalCount: count,
            count: products.length,
            page: parseInt(page as string),
            limit: pagination.limit
        });
    };

    public getProductByIdController = async (req: Request, res: Response, next: NextFunction) => {
        const productId = req.params?.productId

        if (!productId) throw next({ message: "productId is missing!" })

        const product = await this.services.productServices.getProductById(productId)

        if (!product) throw next({ message: "Oops!! Products fetching failed." })

        res.status(HTTP_STATUS_CODES.OK).json({
            success: true,
            message: "Product details fetched successfully",
            data: product
        });
    };

    public getProductReviewsController = async (req: Request, res: Response, next: NextFunction) => {
        const productId = req.params?.productId
        const page = req.query.page;
        const limit = req.query.limit;
        const pagination = this.paginationHelpers.getCurrentPagination({ limit, page })

        if (!productId) next({ message: "Product id is missing!!" })

        const [count, reviews] = await this.services.productServices.getProductReviews(productId, pagination)

        if (!reviews) throw next({ message: "Oops!! product reviews fetching failed!!" })

        res.status(HTTP_STATUS_CODES.OK).json({
            success: true,
            message: "Products fetched successfully",
            data: reviews,
            totalCount: count,
            count: reviews.length,
            page: parseInt(page as string),
            limit: pagination.limit
        });
    }


}

export default IndexControllers;