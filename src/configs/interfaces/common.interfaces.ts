import { Roles } from "@prisma/client";
import { CreateUserDto } from "../dtos/request/auth.request.dto";

export interface DoSignUpInterface extends CreateUserDto {
    roles: Roles[];
}
