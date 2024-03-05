import { Color, Size, AddressType} from "@prisma/client";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AddProductToCartDto {
    @IsString()
    @IsNotEmpty()
    productId: string

    @IsNumber()
    @IsNotEmpty()
    quantity: number

    constructor(productId: string, quantity: number) {
        this.productId = productId
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


    constructor(cartId: string, productId: string) {
        this.cartId = cartId
        this.productId = productId
    }
}
export class PlaceOrderDto {

    @IsNumber()
    @IsNotEmpty()
    totalAmount: number

    @IsString()
    @IsNotEmpty()
    addressId: string

    @IsArray()
    @IsNotEmpty()
    items: PlaceOrderItemType[]


    constructor(totalAmount: number, addressId: string, items: PlaceOrderItemType[]) {
        this.addressId = addressId;
        this.totalAmount = totalAmount;
        this.items = items
    }
}


export type PlaceOrderItemType = {
    productId: string
    color: Color
    size: Size
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