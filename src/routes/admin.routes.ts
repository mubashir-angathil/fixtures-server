import { Router } from "express";
import { Routes } from "../configs/interfaces/routes.interface";
import middlewares from "../middlewares/middlewares";
import tryCatchHandler from "../utils/tryCatchHandler";
import AdminController from "../controllers/admin.controllers";
import { CreateProductDto, DeleteProductDto, DeleteReviewReplayDto, ReplayToProductReviewDto, UpdateOrderStatusDto, UpdateOrderStatusPramsDto, UpdateProductDto } from "../configs/dtos/request/admin.request.dto";
import { UpdateProductReviewsParamsDto } from "../configs/dtos/request/user.request.dto";

class AdminRoute extends AdminController implements Routes {
    path?: string | undefined = '/admin';
    router: Router = Router();
    private middlewares = middlewares;

    constructor() {
        super();
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post("/promotion/create",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateAdminRole,
            tryCatchHandler(this.createPromotionController));


        this.router.post("/product/create",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateAdminRole,
            this.middlewares.validationMiddleware.bodyValidationMiddleware(CreateProductDto),
            tryCatchHandler(this.createProductController));

        this.router.patch("/product/:productId/update",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateAdminRole,
            this.middlewares.validationMiddleware.bodyValidationMiddleware(UpdateProductDto),
            tryCatchHandler(this.updateProductController));

        this.router.delete("/product/:productId/delete",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateAdminRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(DeleteProductDto),
            tryCatchHandler(this.deleteProductController));

        this.router.get("/order/:orderId/update",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateAdminRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(UpdateOrderStatusPramsDto),
            this.middlewares.validationMiddleware.queryValidationMiddleware(UpdateOrderStatusDto),
            tryCatchHandler(this.updateOrderStatusController));

        this.router.post("/product/:productId/review/:reviewId/replay/create",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateAdminRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(UpdateProductReviewsParamsDto),
            this.middlewares.validationMiddleware.bodyValidationMiddleware(ReplayToProductReviewDto),
            tryCatchHandler(this.replayToProductReviewController));

        this.router.delete("/product/:productId/review/:reviewId/replay/:replayId/delete",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateAdminRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(DeleteReviewReplayDto),
            tryCatchHandler(this.deleteReviewReplayController));

        this.router.post("/product/qa/create")
        this.router.post("/product/qa/update")
        this.router.post("/product/qa/remove")
        this.router.post("/product/qa")

    }
}

export default AdminRoute;