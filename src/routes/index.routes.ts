import { Router, Request, Response } from "express";
import { Routes } from "../configs/interfaces/routes.interface";
import { NODE_ENV } from "../configs/configs";
import prisma from "../prisma/prisma";

class IndexRoute implements Routes {
    public path?: string = "";
    router: Router = Router();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get("/", (req: Request, res: Response) => {
            res.status(200).json({
                message: "Hello world🌏",
                environment: NODE_ENV,
            });
        }),
            this.router.get(
                "/promotions",
                async (req: Request, res: Response) => {
                    const promotions = await prisma.promotion.findMany();
                    // console.log(promotions)
                    res.status(200).json({
                        success: true,
                        message: "Promotions fetched successfully",
                        data: promotions,
                    });
                }
            );
    }
}

export default IndexRoute;
