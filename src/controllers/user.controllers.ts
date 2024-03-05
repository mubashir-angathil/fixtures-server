import { NextFunction, Response } from "express"
import { RequestWithUser } from "../configs/interfaces/common.interfaces"
import { HTTP_STATUS_CODES } from "../configs/constants/statusCode.constants"
import services from "../services/services"
import { Status } from "@prisma/client"
import { ValidationError, validate, validateOrReject } from "class-validator"
import consola from "consola"
import { plainToInstance } from "class-transformer"
import ValidationMiddleware from "../middlewares/validation.middlewares"

class UserController {
    private services = services
    private custom = new ValidationMiddleware()

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
    };

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
    };

    public getUserCartController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const userId = req.user?.id

        if (!userId) throw next({ message: "User id is missing!" })

        const cart = await this.services.userServices.getUserCart({ userId })

        if (!cart) throw next({ message: "Cart is empty!!" })

        res.status(HTTP_STATUS_CODES.OK).json({
            success: true,
            message: "Cart details successfully fetched",
            data: cart
        })
    };

    public placeOrderController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const userId = req.user?.id

        if (!userId) throw next({ message: "User id is missing!" })
        const order = await this.services.userServices.placeOrder({ data: req.body, userId })

        if (!order) throw next({ message: "Oops!! Order creation failed, try agin" })

        res.status(HTTP_STATUS_CODES.CREATED).json({
            success: true,
            message: "Placed order successfully!!",
            data: order
        })
    };

    public cancelOrderController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const userId = req.user?.id
        const orderId = req.params?.orderId

        if (!userId) throw next({ message: "User id is missing!" })
        if (!orderId) throw next({ message: "Order id is missing!" })

        const order = await this.services.userServices.cancelOrder({ orderId, userId })

        if (!order) throw next({ message: "Oops!! Order cancelation failed, try agin" })

        res.status(HTTP_STATUS_CODES.CREATED).json({
            success: true,
            message: "Order cancelled successfully!!",
            data: order
        })
    };

    public getOrdersController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        let status = req.query?.status

        const userId = req.user?.id


        if (!userId) throw next({ message: "User id not is missing!!" })

        if (status) {
            status = status?.toString().split('/')
            await this.custom.enumValidationMiddleware(Status, status, next)
        }

        const orders = await this.services.userServices.getOrders({ userId, status: status as Status[] | undefined })


        if (!orders) throw next({ message: "Orders fetching failed!!" })

        res.status(HTTP_STATUS_CODES.OK).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        })
    }

    public createAddressController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const userId = req.user?.id

        if (!userId) throw next({ message: "User id is missing!" })

        const address = await this.services.userServices.createAddress({ ...req.body, userId })

        if (!address) throw next({ message: "Oops!! address creation failed, try agin" })

        res.status(HTTP_STATUS_CODES.CREATED).json({
            success: true,
            message: "Address created successfully!!",
            data: address
        })
    }

    public updateAddressController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const userId = req.user?.id
        const addressId = req.params?.addressId

        if (!userId) throw next({ message: "User id is missing!" })
        if (!addressId) throw next({ message: "Address id is missing!" })

        const address = await this.services.userServices.updateAddress({ ...req.body, userId, addressId })

        if (!address) throw next({ message: "Oops!! address updates failed, try agin" })

        res.status(HTTP_STATUS_CODES.CREATED).json({
            success: true,
            message: "Address updated successfully!!",
            data: address
        })
    }





}

export default UserController