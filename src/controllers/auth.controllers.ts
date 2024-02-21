import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../configs/constants/statusCode.constants";
import services from "../services/services";
import { CreateUserInterface } from "../configs/interfaces/auth.interface";

class AuthControllers {
    public services = services;

    public adminSignUp = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const user: CreateUserInterface =
            await this.services.authServices.doSignUp({
                ...req.body,
                roles: ["Vendor"],
            });
        this.attachAuthTokens(
            req,
            res,
            user,
            "Account created successfully",
            next
        );
    };
    public userSignUp = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const user: CreateUserInterface =
            await this.services.authServices.doSignUp({
                ...req.body,
                roles: ["Customer"],
            });
        this.attachAuthTokens(
            req,
            res,
            user,
            "Account created successfully",
            next
        );
    };
    public adminSignIn = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const user: CreateUserInterface =
            await this.services.authServices.doSignIn(req.body);
        this.attachAuthTokens(req, res, user, "Welcome back!", next);
    };
    public userSignIn = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const user: CreateUserInterface =
            await this.services.authServices.doSignIn(req.body);
        this.attachAuthTokens(req, res, user, "Welcome back!", next);
    };

    private async attachAuthTokens(
        req: Request,
        res: Response,
        user: CreateUserInterface,
        message: string,
        next: NextFunction
    ) {
        const tokens = await Promise.all([
            this.services.authServices.passwordHelper.generateAccessToken(
                {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                },
                "5d"
            ),
            this.services.authServices.passwordHelper.generateRefreshToken({
                id: user.id,
                email: user.email,
                username: user.username,
            }),
        ]);

        if (tokens.length === 2) {
            const loginDetails = {
                ...user,
                password: undefined,
                accessToken: tokens[0],
                refreshToken: tokens[1],
            };
            return res
                .status(
                    message.startsWith("Welcome", 0)
                        ? HTTP_STATUS_CODES.OK
                        : HTTP_STATUS_CODES.CREATED
                )
                .json({
                    success: true,
                    message,
                    data: loginDetails,
                });
        }

        return next({
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: "Token generation failed!!",
        });
    }
}
export default AuthControllers;
