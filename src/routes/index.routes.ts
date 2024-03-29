import { Router, Request, Response } from "express";
import { Routes } from "../configs/interfaces/routes.interface";
import { NODE_ENV } from "../configs/configs";
import IndexControllers from "../controllers/index.controllers";
import tryCatchHandler from "../utils/tryCatchHandler";
import middlewares from "../middlewares/middlewares";
import { PaginationDto } from "../configs/dtos/request/index.request.dto";
import { CreateProductQuestionDto, CreateProductQuestionParamsDto, CreateProductReviewsParamsDto } from "../configs/dtos/request/user.request.dto";
import UserController from "../controllers/user.controllers";

class IndexRoute extends IndexControllers implements Routes {
    public path?: string = "";
    router: Router = Router();
    private middlewares = middlewares

    constructor() {
        super();
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get("/", (req: Request, res: Response) => {
            res.status(200).json({
                message: "Hello world🌏",
                environment: NODE_ENV,
            });
        });
        this.router.get("/products",
            this.middlewares.validationMiddleware.queryValidationMiddleware(PaginationDto),
            tryCatchHandler(this.getAllProductController));

        this.router.get("/product/:productId",
            tryCatchHandler(this.getProductByIdController));

        this.router.get("/product/:productId/reviews",
            this.middlewares.validationMiddleware.queryValidationMiddleware(PaginationDto),
            this.middlewares.validationMiddleware.paramsValidationMiddleware(CreateProductReviewsParamsDto),
            tryCatchHandler(this.getProductReviewsController));

        this.router.get(
            "/product/:productId/qas",
            this.middlewares.validationMiddleware.queryValidationMiddleware(PaginationDto),
            tryCatchHandler(this.getProductQuestionAndAnswersController)
        );
    }
}

export default IndexRoute;
