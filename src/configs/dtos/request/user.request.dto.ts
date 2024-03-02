import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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
