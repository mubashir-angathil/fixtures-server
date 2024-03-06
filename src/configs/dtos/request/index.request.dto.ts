import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, IsUrl, isNotEmpty } from "class-validator";

export class CreatePromotionDto {
    @IsString()
    @IsUrl()
    url: string;

    @IsString()
    @IsDateString()
    validity: string;

    constructor(url: string, validity: string) {
        this.url = url;
        this.validity = validity;
    }
}

export class PaginationDto {
    @IsString()
    @IsNotEmpty()
    page: string

    @IsString()
    @IsNotEmpty()
    limit: string

    constructor(limit: string, page: string) {
        this.page = page
        this.limit = limit
    }
}
