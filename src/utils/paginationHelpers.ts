import { PaginationInterface } from "../configs/interfaces/common.interfaces";

class PaginationHelpers {
    public getCurrentPagination = ({ page, limit }: { page: any, limit: any }): PaginationInterface => {
        // Check if both page and limit are provided
        if (page && limit) {
            // Parse page and limit to integers
            const currentPage = parseInt(page);
            const currentLimit = parseInt(limit);

            // Calculate offset based on page and limit
            const pagination = {
                offset: (currentPage - 1) * currentLimit,
                limit: currentLimit,
            };

            return pagination;
        } else {
            // If either page or limit is not provided, set default values
            return {
                offset: page ? parseInt(page) : 0,
                limit: limit ? parseInt(limit) : 10,
            };
        }
    }
}

export default PaginationHelpers