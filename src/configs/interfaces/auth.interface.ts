import { $Enums } from "@prisma/client";

export interface CreateUserInterface {
    id: string;
    username: string;
    email: string;
    password: string;
    dob?: Date;
    roles: $Enums.Roles[];
    createdAt: Date;
    updatedAt: Date;
}
