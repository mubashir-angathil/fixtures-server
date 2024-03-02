import { NextFunction, Response } from "express"
import { RequestWithUser } from "../configs/interfaces/common.interfaces"
import { HTTP_STATUS_CODES } from "../configs/constants/statusCode.constants"
import services from "../services/services"

class UserController {
    private services = services

    public addProductToCartController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const userId = req.user?.id

        if (!userId) throw next({ message: "User id is missing!" })

        const { cart, deleted } = await this.services.userServices.addProductToCart({ ...req.body, userId: userId })

        res.status(HTTP_STATUS_CODES.CREATED).json({
            success: true,
            message: deleted
                ? "Product successfully removed from cart"
                : "Product successfully added to cart",
            data: cart
        })
    }

    public removeProductFromCartController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const cart = await this.services.userServices.removeProductFromCart({
            productId: req.params.productId,
            cartId: req.params.cartId
        })

        if (!cart) throw next({ message: "Operation Failed!!, Failed to remove product from cart" })

        res.status(HTTP_STATUS_CODES.OK).json({
            success: true,
            message: "Product successfully removed from cart"
        })
    }
}

export default UserController