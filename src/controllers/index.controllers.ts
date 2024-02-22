import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../configs/constants/statusCode.constants";
import services from "../services/services";

class IndexControllers {
    private services = services;

    public getPromotionsController = async (req: Request, res: Response) => {
        const promotions = await this.services.indexServices.getPromotions();

        res.status(HTTP_STATUS_CODES.OK).json({
            success: true,
            message: "Promotions fetched successfully",
            data: promotions
        });

    };
}

export default IndexControllers;