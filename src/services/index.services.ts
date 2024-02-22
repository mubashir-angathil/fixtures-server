import { CreatePromotionDto } from "../configs/dtos/request/index.request.dto";
import prisma from "../prisma/prisma";

class IndexServices {

    public createPromotion = async (promotion: CreatePromotionDto) => {
        try {
            return await prisma.promotion.create({
                data: promotion
            });
        } catch (error) {
            throw error;
        }
    };
    public getPromotions = async () => {
        const currentDateTime = new Date().toISOString();
        try {
            const promotions = await prisma.promotion.findMany({
                where: {
                    validity: {
                        gte: currentDateTime
                    },
                    usageLimit: {
                        lt: 50
                    },
                    isActive: true
                }
            });

            if (!promotions) {
                throw new Error("Promotions not found");
            }

            return promotions;
        } catch (error) {
            throw error;
        }
    };
}
export default IndexServices;