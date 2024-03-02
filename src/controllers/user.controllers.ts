import { NextFunction, Response } from "express"
import { RequestWithUser } from "../configs/interfaces/common.interfaces"
import { HTTP_STATUS_CODES } from "../configs/constants/statusCode.constants"
import services from "../services/services"

class UserController {
    private services = services

    public addProductToCartController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const userId = req.user?.id

        if (!userId) throw next({ message: "User id is missing!" })

        const cart = await this.services.userServices.addProductToCart({ ...req.body, userId: userId })

        res.status(HTTP_STATUS_CODES.OK).json({
            success: true,
            message: "",
            data: cart
        })
    }
}

export default UserController