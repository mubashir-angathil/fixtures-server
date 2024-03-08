import { $Enums, Color, Photo, Product, Size, Status } from "@prisma/client";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, isString } from "class-validator"
import { CancelOrderDto, UpdateProductReviewsParamsDto } from "./user.request.dto";

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
    @IsEnum(Color)
    colors: Color[]

    @IsArray()
    @IsOptional()
    @IsEnum(Size)
    sizes: Size[]

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

export class DeleteProductDto {
    @IsString()
    @IsNotEmpty()
    productId: string

    constructor(productId: string) {
        this.productId = productId
    }
}

export class UpdateOrderStatusDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(Status)
    status: Status

    constructor(status: Status) {
        this.status = status
    }
}

export class UpdateOrderStatusPramsDto extends CancelOrderDto { }

export class ReplayToProductReviewDto {
    @IsString()
    @IsNotEmpty()
    content: string
    constructor(content: string) {
        this.content = content
    }
}

export class DeleteReviewReplayDto extends UpdateProductReviewsParamsDto {
    @IsString()
    @IsNotEmpty()
    replayId: string

    constructor(replayId: string, productId: string, reviewId: string) {
        super(productId, reviewId)
        this.replayId = replayId
    }
}

export class CreateProductQADto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    question: string

    @IsString()
    @IsOptional()
    @MinLength(2)
    answer?: string

    constructor(question: string, answer: string) {
        this.question = question
        this.answer = answer
    }
}

export class UpdateProductQADto {
    @IsString()
    @IsOptional()
    @MinLength(8)
    question?: string

    @IsString()
    @IsOptional()
    @MinLength(2)
    answer?: string
}

export class CreateProductQAParamsDto extends DeleteProductDto { }

export class AnswerToQuestionDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    answer: string

    constructor(answer: string) {
        this.answer = answer
    }
}

export class AnswerToQuestionParamsDto extends CreateProductQAParamsDto {
    @IsString()
    @IsNotEmpty()
    qaId: string

    constructor(qaId: string, productId: string) {
        super(productId)
        this.qaId = qaId
    }
}

export class RemoveProductQaParamsDto extends AnswerToQuestionParamsDto { }