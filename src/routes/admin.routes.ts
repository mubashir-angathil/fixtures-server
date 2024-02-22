import { Router } from "express";
import { Routes } from "../configs/interfaces/routes.interface";
import middlewares from "../middlewares/middlewares";
import tryCatchHandler from "../utils/tryCatchHandler";
import AdminController from "../controllers/admin.controllers";

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

    }
}

export default AdminRoute;