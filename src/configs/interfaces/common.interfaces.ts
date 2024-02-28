import { $Enums, Roles } from "@prisma/client";
import { Request } from "express";
import { CreateUserInterface } from "./auth.interface";
import { CreateUserDto } from "../dtos/response/auth.request.dto";

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