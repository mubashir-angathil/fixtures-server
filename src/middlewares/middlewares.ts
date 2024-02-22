import AuthMiddleware from "./auth.middlewares";
import ErrorMiddleware from "./errorHandler.middlewares";
import ValidationMiddleware from "./validation.middlewares";

export default {
    authMiddleware: new AuthMiddleware(),
    errorMiddleware: new ErrorMiddleware(),
    validationMiddleware: new ValidationMiddleware()
}