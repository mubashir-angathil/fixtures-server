import { Router } from "express";
import { Routes } from "../configs/interfaces/routes.interface";
import middlewares from "../middlewares/middlewares";
import tryCatchHandler from "../utils/tryCatchHandler";
import UserController from "../controllers/user.controllers";
import { AddProductToCartDto } from "../configs/dtos/request/user.request.dto";

class UserRoute extends UserController implements Routes {
    path?: string = "/user"
    router: Router = Router()
    private middlewares = middlewares

    constructor() {
        super()
        this.initializeRoutes()
    }

    private initializeRoutes = () => {
        this.router.post(
            "/cart/add",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.validationMiddleware.bodyValidationMiddleware(AddProductToCartDto),
            tryCatchHandler(this.addProductToCartController));
    }
}

export default UserRoute