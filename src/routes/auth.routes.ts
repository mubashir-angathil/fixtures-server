import { Router } from "express";
import { Routes } from "../configs/interfaces/routes.interface";
import AuthControllers from "../controllers/auth.controllers";
import { bodyValidationMiddleware } from "../middlewares/validation.middlewares";
import {
    CreateUserDto,
    UserSignInDto,
} from "../configs/dtos/request/auth.request.dto";
import tryCatchHandler from "../utils/tryCatchHandler";

class AuthRoute extends AuthControllers implements Routes {
    path: string = "/auth";
    router: Router = Router();

    constructor() {
        super();
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            "/sign-up/admin",
            bodyValidationMiddleware(CreateUserDto),
            tryCatchHandler(this.adminSignUp)
        );
        this.router.post(
            "/sign-up",
            bodyValidationMiddleware(CreateUserDto),
            tryCatchHandler(this.userSignUp)
        );
        this.router.post(
            "/sign-in/admin",
            bodyValidationMiddleware(UserSignInDto),
            tryCatchHandler(this.adminSignIn)
        );
        this.router.post(
            "/sign-in",
            bodyValidationMiddleware(UserSignInDto),
            tryCatchHandler(this.userSignIn)
        );
    }
}
export default AuthRoute;
