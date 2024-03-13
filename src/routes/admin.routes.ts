import { Router } from "express";
import { Routes } from "../configs/interfaces/routes.interface";
import middlewares from "../middlewares/middlewares";
import tryCatchHandler from "../utils/tryCatchHandler";
import AdminController from "../controllers/admin.controllers";
import { AnswerToQuestionDto, AnswerToQuestionParamsDto, CreateProductDto, CreateProductQADto, CreateProductQAParamsDto, CreateProductVariantDto, CreateProductVariantParamsDto, DeleteProductDto, DeleteReviewReplayDto, RemoveProductQaParamsDto, ReplayToProductReviewDto, UpdateOrderStatusDto, UpdateOrderStatusPramsDto, UpdateProductDto, UpdateProductQADto, UpdateProductVariantDto, UpdateProductVariantParamsDto } from "../configs/dtos/request/admin.request.dto";
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

        this.router.post("/product/:productId/variant/create",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateAdminRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(CreateProductVariantParamsDto),
            this.middlewares.validationMiddleware.bodyValidationMiddleware(CreateProductVariantDto),
            tryCatchHandler(this.createProductVariantController));

        this.router.patch("/product/:productId/variant/:variantId/update",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateAdminRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(UpdateProductVariantParamsDto),
            this.middlewares.validationMiddleware.bodyValidationMiddleware(UpdateProductVariantDto),
            tryCatchHandler(this.updateProductVariantController));

        this.router.delete("/product/:productId/variant/:variantId/delete",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateAdminRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(UpdateProductVariantParamsDto),
            tryCatchHandler(this.deleteProductVariantController));

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

        this.router.post(
            "/product/:productId/qa/create",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateAdminRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(CreateProductQAParamsDto),
            this.middlewares.validationMiddleware.bodyValidationMiddleware(CreateProductQADto),
            tryCatchHandler(this.createProductQAController));

        this.router.post(
            "/product/:productId/qa/:qaId/update",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateAdminRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(RemoveProductQaParamsDto),
            this.middlewares.validationMiddleware.bodyValidationMiddleware(UpdateProductQADto),
            tryCatchHandler(this.updateProductQAController));

        this.router.post(
            "/product/:productId/question/:qaId/answer",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateAdminRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(AnswerToQuestionParamsDto),
            this.middlewares.validationMiddleware.bodyValidationMiddleware(AnswerToQuestionDto),
            tryCatchHandler(this.answerToQuestionController)
        )

        this.router.delete("/product/:productId/qa/:qaId/delete",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateAdminRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(RemoveProductQaParamsDto),
            tryCatchHandler(this.deleteProductQaController)
        )
    }
}

export default AdminRoute;