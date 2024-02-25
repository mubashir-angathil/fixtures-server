import { NextFunction, Request, Response } from "express";
import services from "../services/services";
import { HTTP_STATUS_CODES } from "../configs/constants/statusCode.constants";

class DataControllers {
    private services = services
    public getCategoriesController = async (req: Request, res: Response, next: NextFunction) => {
        const categories = await this.services.dataServices.getCategories()

        if (!categories) throw next({ status: HTTP_STATUS_CODES.NOT_FOUND, message: "categories not found" })
        
        res.status(HTTP_STATUS_CODES.OK).json({ success: true, message: "Categories fetched successfully", data: categories })
    }
}

export default DataControllers