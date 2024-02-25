import { Router } from "express";
import { Routes } from "../configs/interfaces/routes.interface";
import middlewares from "../middlewares/middlewares";
import tryCatchHandler from "../utils/tryCatchHandler";
import DataControllers from "../controllers/data.controllers";

class DataRoute extends DataControllers implements Routes {
    path?: string = '/data'
    router: Router = Router();
    private middlewares = middlewares;


    constructor() {
        super();
        this.initializeRoutes()
    }

    private initializeRoutes = () => {
        this.router.get('/categories', this.middlewares.authMiddleware.verifyToken, tryCatchHandler(this.getCategoriesController))
    }
}
export default DataRoute