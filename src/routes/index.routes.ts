import { Router, Request, Response } from "express";
import { Routes } from "../configs/interfaces/routes.interface";
import { NODE_ENV } from "../configs/configs";

class IndexRoute implements Routes {
    public path?: string = '';
    router: Router = Router();
    constructor() {
        this.initializeRoutes()
    }
    private initializeRoutes() {
        this.router.get(`/`, (req: Request, res: Response) => {
            res.status(200).json({
                message: 'Hello world🌏',
                environment: NODE_ENV
            })
        })
    }
}

export default IndexRoute