import { $Enums, Roles } from "@prisma/client";
import { CreateUserDto } from "../dtos/request/auth.request.dto";
import { Request } from "express";
import { CreateUserInterface } from "./auth.interface";

export interface DoSignUpInterface extends CreateUserDto {
    role: $Enums.Roles;
}

export interface RequestWithUser extends Request{
    user?: CreateUserInterface | null
}