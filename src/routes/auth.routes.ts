import { Router } from "express";
import { Routes } from "../configs/interfaces/routes.interface";
import AuthControllers from "../controllers/auth.controllers";
import {
    CreateUserDto,
    UserSignInDto,
} from "../configs/dtos/request/auth.request.dto";
import tryCatchHandler from "../utils/tryCatchHandler";
import middlewares from "../middlewares/middlewares";

class AuthRoute extends AuthControllers implements Routes {
    path: string = "/auth";
    router: Router = Router();
    private middlewares = middlewares;

    constructor() {
        super();
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            "/sign-up/admin",
            this.middlewares.validationMiddleware.bodyValidationMiddleware(CreateUserDto),
            tryCatchHandler(this.adminSignUp)
        );
        this.router.post(
            "/sign-up",
            this.middlewares.validationMiddleware.bodyValidationMiddleware(CreateUserDto),
            tryCatchHandler(this.userSignUp)
        );
        this.router.post(
            "/sign-in/admin",
            this.middlewares.validationMiddleware.bodyValidationMiddleware(UserSignInDto),
            tryCatchHandler(this.adminSignIn)
        );
        this.router.post(
            "/sign-in",
            this.middlewares.validationMiddleware.bodyValidationMiddleware(UserSignInDto),
            tryCatchHandler(this.userSignIn)
        );
    }
}
export default AuthRoute;
