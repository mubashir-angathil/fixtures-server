import { Router } from "express";
import { Routes } from "../configs/interfaces/routes.interface";
import middlewares from "../middlewares/middlewares";
import tryCatchHandler from "../utils/tryCatchHandler";
import UserController from "../controllers/user.controllers";
import { AddProductToCartDto, RemoveProductFromCartDto } from "../configs/dtos/request/user.request.dto";

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
            "/cart/:cartId/product/:productId/delete",
            this.middlewares.authMiddleware.verifyToken,
            this.middlewares.authMiddleware.validateUserRole,
            this.middlewares.validationMiddleware.paramsValidationMiddleware(RemoveProductFromCartDto),
            tryCatchHandler(this.removeProductFromCartController));
    }
}

export default UserRoute