import { $Enums, Photo, Product } from "@prisma/client";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsInt()
    @IsNotEmpty()
    quantity: number

    @IsInt()
    @IsNotEmpty()
    price: Product['price'];

    @IsArray()
    @IsNotEmpty()
    photos: Photo[];

    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @IsArray()
    @IsNotEmpty()
    colors: $Enums.Color[]

    @IsArray()
    @IsNotEmpty()
    sizes: $Enums.Size[]

    constructor(
        name: string,
        description: string,
        price: number,
        quantity: number,
        photos: Photo[],
        categoryId: string,
        colors: $Enums.Color[],
        sizes: $Enums.Size[]
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity
        this.photos = photos;
        this.categoryId = categoryId
        this.colors = colors
        this.sizes = sizes
    }
}

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsInt()
    @IsOptional()
    price: Product['price'];

    @IsInt()
    @IsOptional()
    quantity: number

    @IsString()
    @IsOptional()
    categoryId: string;

    @IsArray()
    @IsOptional()
    photos: Photo[];

    @IsArray()
    @IsOptional()
    colors: $Enums.Color[]

    @IsArray()
    @IsOptional()
    sizes: $Enums.Size[]

    constructor(name: string, description: string, price: number, quantity: number, photos: Photo[], categoryId: string, colors: $Enums.Color[], sizes: $Enums.Size[]) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.categoryId = categoryId
        this.photos = photos;
        this.colors = colors;
        this.sizes = sizes;
    }
}
