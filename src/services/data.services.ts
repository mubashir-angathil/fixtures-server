import prisma from "../prisma/prisma"

class DataServices {
    public getCategories = async() => {
        try {
            return await prisma.category.findMany()
        } catch (error) {
            throw error
        }
    }
}

export default DataServices