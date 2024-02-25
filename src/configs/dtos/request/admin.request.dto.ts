import { IsArray, IsEmpty, IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsEmpty()
    description: string;

    @IsInt()
    @IsNotEmpty()
    price: number;

    @IsArray()
    @IsEmpty()
    image: string[];

    @IsString()
    @IsEmpty()
    categoryId: string;

    constructor(name: string, description: string, price: number, image: string[], categoryId: string, vendorId: string) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.categoryId = categoryId
    }
}