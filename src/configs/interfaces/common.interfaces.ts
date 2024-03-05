import { $Enums, Roles } from "@prisma/client";
import { Request } from "express";
import { CreateUserInterface } from "./auth.interface";
import { CreateUserDto } from "../dtos/response/auth.request.dto";
import { CreateAddressDto, PlaceOrderDto, PlaceOrderItemType, UpdateAddressDto } from "../dtos/request/user.request.dto";

export interface DoSignUpInterface extends CreateUserDto {
    role: $Enums.Roles;
}

export interface RequestWithUser extends Request {
    user?: CreateUserInterface | null
}

export interface PaginationInterface {
    limit: number,
    offset: number
}

export interface PlaceOrderItemInterface extends PlaceOrderItemType {
    userId: string
}

export interface CreateAddressInterface extends CreateAddressDto {
    userId: string
}

export interface UpdateAddressInterface extends UpdateAddressDto {
    userId: string
    addressId: string
}