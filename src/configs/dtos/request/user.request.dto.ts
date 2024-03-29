import { AddressType } from "@prisma/client";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min, Max, MinLength } from "class-validator";

export class AddProductToCartDto {
    @IsString()
    @IsNotEmpty()
    productId: string

    @IsString()
    @IsNotEmpty()
    variantId: string

    @IsNumber()
    @IsNotEmpty()
    quantity: number

    constructor(productId: string, quantity: number, variantId: string) {
        this.productId = productId
        this.variantId = variantId
        this.quantity = quantity
    }
}

export class RemoveProductFromCartDto {
    @IsString()
    @IsNotEmpty()
    cartId: string

    @IsString()
    @IsNotEmpty()
    productId: string

    @IsString()
    @IsNotEmpty()
    variantId: string

    constructor(cartId: string, productId: string, variantId: string) {
        this.cartId = cartId
        this.productId = productId
        this.variantId = variantId
    }
}
export class PlaceOrderDto {
    @IsString()
    @IsNotEmpty()
    addressId: string

    @IsArray()
    @IsNotEmpty()
    items: PlaceOrderItemType[]


    constructor(addressId: string, items: PlaceOrderItemType[]) {
        this.addressId = addressId;
        this.items = items
    }
}

export class PlaceOrderQueryDto {
    @IsString()
    @IsOptional()
    cartId?: string
}

export type PlaceOrderItemType = {
    productId: string
    variantId: string
    quantity: number
    unitPrice: number
    promotionCode?: string
}

export class CreateAddressDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    phone: string

    @IsNumber()
    @IsNotEmpty()
    pinCode: number

    @IsString()
    @IsNotEmpty()
    locality: string

    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsNotEmpty()
    state: string

    @IsString()
    @IsNotEmpty()
    cityDistrictTown: string

    @IsString()
    @IsOptional()
    alternativePhoneNumber: string


    @IsString()
    @IsOptional()
    landmark: string

    @IsString()
    @IsOptional()
    @IsEnum(AddressType)
    addressType: AddressType

    constructor(
        name: string,
        phone: string,
        pinCode: number,
        locality: string,
        address: string,
        cityDistrictTown: string,
        state: string,
        alternativePhoneNumber: string,
        landmark: string,
        addressType: AddressType) {

        this.name = name
        this.phone = phone
        this.pinCode = pinCode
        this.locality = locality
        this.address = address
        this.cityDistrictTown = cityDistrictTown
        this.alternativePhoneNumber = alternativePhoneNumber
        this.landmark = landmark
        this.addressType = addressType
        this.state = state
    }
}

export class UpdateAddressDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsNumber()
    pinCode?: number;

    @IsOptional()
    @IsString()
    locality?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    state?: string;

    @IsOptional()
    @IsString()
    cityDistrictTown?: string;

    @IsOptional()
    @IsString()
    alternativePhoneNumber?: string;

    @IsOptional()
    @IsString()
    landmark?: string;

    @IsOptional()
    @IsString()
    @IsEnum(AddressType)
    addressType?: AddressType;
}

export class UpdateAddressParamsDto {
    @IsString()
    @IsNotEmpty()
    addressId: string

    constructor(addressId: string) {
        this.addressId = addressId
    }
}

export class CancelOrderDto {
    @IsString()
    @IsNotEmpty()
    orderId: string

    constructor(orderId: string) {
        this.orderId = orderId
    }
}

export class CreateReviewDto {
    @IsNumber()
    @Min(1)
    @Max(5)
    @IsNotEmpty()
    rating: number

    @IsString()
    @IsNotEmpty()
    review: string

    @IsArray()
    @IsNotEmpty()
    @IsOptional()
    images?: string[]

    constructor(rating: number, review: string) {
        this.rating = rating
        this.review = review
    }
}

export class CreateProductReviewsDto {
    @IsNumber()
    @Min(1)
    @Max(5)

    rating: number;

    @IsString()
    @IsNotEmpty()
    review: string

    @IsArray()
    @IsNotEmpty()
    @IsOptional()
    images?: string[]

    constructor(rating: number, review: string) {
        this.rating = rating
        this.review = review
    }
}
export class CreateProductReviewsParamsDto {
    @IsString()
    @IsNotEmpty()
    productId: string

    constructor(productId: string) {
        this.productId = productId
    }
}

export class UpdateProductReviewsDto {
    @IsNumber()
    @Min(1)
    @Max(5)
    @IsOptional()
    rating?: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    review?: string

    @IsArray()
    @IsNotEmpty()
    @IsOptional()
    images?: string[]
}

export class UpdateProductReviewsParamsDto {

    @IsString()
    @IsNotEmpty()
    productId: string

    @IsString()
    @IsNotEmpty()
    reviewId: string

    constructor(reviewId: string, productId: string) {
        this.productId = productId
        this.reviewId = reviewId
    }
}

export class CreateProductQuestionParamsDto extends CreateProductReviewsParamsDto { }

export class CreateProductAnswerParamsDto extends CreateProductReviewsParamsDto { }
export class CreateProductQuestionDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    question: string

    constructor(question: string) {
        this.question = question
    }
}