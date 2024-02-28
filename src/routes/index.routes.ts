import { Router, Request, Response } from "express";
import { Routes } from "../configs/interfaces/routes.interface";
import { NODE_ENV } from "../configs/configs";
import IndexControllers from "../controllers/index.controllers";
import tryCatchHandler from "../utils/tryCatchHandler";
import middlewares from "../middlewares/middlewares";
import { PaginationDto } from "../configs/dtos/request/index.request.dto";

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
    }
}

export default IndexRoute;
