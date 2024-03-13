import { $Enums, Color, Photo, Product, Size, Status } from "@prisma/client";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength, isString } from "class-validator"
import { CancelOrderDto, UpdateProductReviewsParamsDto } from "./user.request.dto";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @IsNumber()
    @Min(1)
    commonPrice: number

    @IsArray()
    @IsNotEmpty()
    variants: CreateProductVariantDto[]

    constructor(
        name: string,
        description: string,
        categoryId: string,
        commonPrice: number,
        variants: CreateProductVariantDto[]
    ) {
        this.name = name;
        this.description = description;
        this.categoryId = categoryId
        this.commonPrice = commonPrice
        this.variants = variants
    }
}

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    categoryId?: string;

    @IsNumber()
    @Min(1)
    @IsOptional()
    commonPrice?: number
}

export class DeleteProductDto {
    @IsString()
    @IsNotEmpty()
    productId: string

    constructor(productId: string) {
        this.productId = productId
    }
}

export class CreateProductVariantDto {

    @IsNumber()
    @Min(1)
    @IsOptional()
    optionalPrice?: number;

    @IsInt()
    @Min(1)
    quantity: number

    @IsArray()
    @IsNotEmpty()
    photos: Photo[];

    @IsNotEmpty()
    @IsEnum(Color)
    color: Color

    @IsNotEmpty()
    @IsEnum(Size)
    size: Size

    constructor(quantity: number, photos: Photo[], color: Color, size: Size) {
        this.quantity = quantity
        this.photos = photos
        this.color = color
        this.size = size
    }
}

export class UpdateProductVariantDto {

    @IsNumber()
    @Min(1)
    @IsOptional()
    optionalPrice?: number;

    @IsInt()
    @IsOptional()
    quantity?: number

    @IsArray()
    @IsOptional()
    photos?: Photo[];

    @IsOptional()
    @IsEnum(Color)
    color?: Color

    @IsOptional()
    @IsEnum(Size)
    size?: Size
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

export class CreateProductVariantParamsDto {
    @IsString()
    @IsNotEmpty()
    productId: string

    constructor(productId: string) {
        this.productId = productId
    }
}
export class UpdateProductVariantParamsDto extends CreateProductVariantParamsDto {
    @IsString()
    @IsNotEmpty()
    variantId: string

    constructor(productId: string, variantId: string) {
        super(productId)
        this.variantId = variantId
    }
}