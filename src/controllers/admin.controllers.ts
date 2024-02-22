import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../configs/constants/statusCode.constants";
import services from "../services/services";

class AdminController {
    private services = services;
    
    public createPromotionController = async (req: Request, res: Response) => {
        const promotion = await this.services.indexServices.createPromotion(req.body);

        res.status(HTTP_STATUS_CODES.CREATED).json({
            success: true,
            message: "Promotion created successfully",
            data: promotion
        });
    };
}
export default AdminController