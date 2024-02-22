import { IsDateString, IsString, IsUrl } from "class-validator";

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