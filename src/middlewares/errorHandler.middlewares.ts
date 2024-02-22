import { NextFunction, Request, Response } from "express";
import HttpException from "../configs/exceptions/HttpException";
import { HTTP_STATUS_CODES } from "../configs/constants/statusCode.constants";

class ErrorMiddleware {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public errorHandler = (
        {
            status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message,
            ...reset
        }: HttpException,
        _req: Request,
        res: Response,
        // eslint-disable-next-line no-unused-vars
        _next: NextFunction
    ) => {
        throw new HttpException(status, message, reset, res);
    };
}
export default ErrorMiddleware;
