import { NextFunction, Request, Response } from "express";
import JwtHelper from "../utils/jwtHelper";
import { ACCESS_TOKEN_SECRET } from "../configs/configs";
import services from "../services/services";
import { HTTP_STATUS_CODES } from "../configs/constants/statusCode.constants";
import { RequestWithUser } from "../configs/interfaces/common.interfaces";

class AuthMiddleware extends JwtHelper {
    private services = services
    
    public verifyToken = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
        const authToken = req.headers.authorization;
        try {
            if (authToken === undefined) throw next({ status: HTTP_STATUS_CODES.UNAUTHORIZED, message: 'Authentication failed' })

            const user = await this.authenticateJwtToken(
                authToken.split(" ")[1],
                ACCESS_TOKEN_SECRET,
            );

            if (user) {
                const isValidUser = await this.services.authServices.findUserById({ userId: user.id })
                if (!isValidUser) {
                    throw next({
                        status: HTTP_STATUS_CODES.UNAUTHORIZED,
                        message: 'Invalid user!! Please login and try again!'
                    })
                } else {
                    req.user = isValidUser;
                    next();
                }
            } else {
                next({
                    status: HTTP_STATUS_CODES.BAD_REQUEST,
                    message: 'Token expired or invalid'
                })
            }
        } catch (error) {
            next({ status: HTTP_STATUS_CODES.UNAUTHORIZED, message: 'Token expired or invalid', error })
        }
    };

    public validateAdminRole = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
        try {
            if (!req.user) throw next({ status: HTTP_STATUS_CODES.FORBIDDEN, message: "Forbidden operation" })
            else {
                const user = await this.services.authServices.findUserById({ userId: req.user?.id })
                if (user?.role === 'Vendor') next()
                else next({ status: HTTP_STATUS_CODES.FORBIDDEN, message: "Forbidden operation" })

            }

        } catch (error) {
            next({ status: HTTP_STATUS_CODES.UNAUTHORIZED, message: "Forbidden operation", error })
        }
    }
}

export default AuthMiddleware;