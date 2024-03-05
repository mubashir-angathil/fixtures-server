import { Status } from "@prisma/client"
import prisma from "../prisma/prisma"

class AdminServices {
    public UpdateOrderStatus = async ({ orderId, status }: { orderId: string, status: Status }) => {
        try {
            console.log(status)
            return await prisma.order.update({
                where: { id: orderId, cancelled: false, status: { not: status } },
                data: { status }
            })
        } catch (error) {
            throw error
        }
    }
}

export default AdminServices