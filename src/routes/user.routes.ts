import { Router } from "express";
import { Routes } from "../configs/interfaces/routes.interface";
import middlewares from "../middlewares/middlewares";
import tryCatchHandler from "../utils/tryCatchHandler";
import UserController from "../controllers/user.controllers";
import { AddProductToCartDto, CancelOrderDto, CreateAddressDto, CreateProductQuestionDto, CreateProductQuestionParamsDto, CreateProductReviewsDto, CreateProductReviewsParamsDto, PlaceOrderDto, PlaceOrderQueryDto, RemoveProductFromCartDto, UpdateAddressDto, UpdateAddressParamsDto, UpdateProductReviewsDto, UpdateProductReviewsParamsDto } from "../configs/dtos/request/user.request.dto";

class UserRoute extends UserController implements Routes {
    path?: string = "/user"
    router: Router = Router()
    private middlewares = middlewares

    constructor() {
        super()
        this.initializeRoutes()
    }

    private initializeRoutes = () => {
        this.router.get(
            "/cart",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateUserRole,
            tryCatchHandler(this.getUserCartController));

        this.router.post(
            "/cart/add",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateUserRole,
            this.middlewares.validationMiddleware.bodyValidationMiddleware(AddProductToCartDto),
            tryCatchHandler(this.addProductToCartController));

        this.router.delete(
            "/cart/:cartId/product/:productId/variant/:variantId/delete",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateUserRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(RemoveProductFromCartDto),
            tryCatchHandler(this.removeProductFromCartController));

        this.router.post(
            "/order/place",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateUserRole,
            this.middlewares.validationMiddleware.queryValidationMiddleware(PlaceOrderQueryDto),
            this.middlewares.validationMiddleware.bodyValidationMiddleware(PlaceOrderDto),
            tryCatchHandler(this.placeOrderController)
        );

        this.router.get(
            "/order/:orderId/cancel",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateUserRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(CancelOrderDto),
            tryCatchHandler(this.cancelOrderController)
        );

        this.router.get(
            "/orders",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateUserRole,
            tryCatchHandler(this.getOrdersController)
        );

        this.router.post(
            "/address/create",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateUserRole,
            this.middlewares.validationMiddleware.bodyValidationMiddleware(CreateAddressDto),
            tryCatchHandler(this.createAddressController)
        );

        this.router.patch(
            "/address/:addressId/update",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateUserRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(UpdateAddressParamsDto),
            this.middlewares.validationMiddleware.bodyValidationMiddleware(UpdateAddressDto),
            tryCatchHandler(this.updateAddressController)
        );

        this.router.post(
            "/product/:productId/review/create",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateUserRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(CreateProductReviewsParamsDto),
            this.middlewares.validationMiddleware.bodyValidationMiddleware(CreateProductReviewsDto),
            tryCatchHandler(this.createProductReviewController)
        )
        this.router.patch("/product/:productId/review/:reviewId/update",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateUserRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(UpdateProductReviewsParamsDto),
            this.middlewares.validationMiddleware.bodyValidationMiddleware(UpdateProductReviewsDto),
            tryCatchHandler(this.updateProductReviewController)
        )
        this.router.delete("/product/:productId/review/:reviewId/remove",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateUserRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(UpdateProductReviewsParamsDto),
            tryCatchHandler(this.removeProductReviewController)
        )

        this.router.get(
            "/product/:productId/review/:reviewId/react",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateUserRole,
            tryCatchHandler(this.reactProductReviewController)
        )

        this.router.post(
            "/product/:productId/question/create",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateUserRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(CreateProductQuestionParamsDto),
            this.middlewares.validationMiddleware.bodyValidationMiddleware(CreateProductQuestionDto),
            tryCatchHandler(this.createProductQuestionController)
        );
    }
}

export default UserRoute