import { Router, Request, Response } from "express";
import { Routes } from "../configs/interfaces/routes.interface";
import { NODE_ENV } from "../configs/configs";
import tryCatchHandler from "../utils/tryCatchHandler";
import IndexControllers from "../controllers/index.controllers";

class IndexRoute extends IndexControllers implements Routes {
    public path?: string = "";
    router: Router = Router();
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
        this.router.post("/promotion/create", tryCatchHandler(this.createPromotionController));
        this.router.get("/promotions", tryCatchHandler(this.getPromotionsController));
    }
}

export default IndexRoute;
