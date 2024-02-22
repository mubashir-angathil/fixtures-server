import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../configs/configs";
import { $Enums } from "@prisma/client";

class PasswordHelpers {
    private saltRounds = 10;

    public async hashPassword(password: string) {
        return await bcrypt.hash(password, this.saltRounds);
    }

    public async comparePassword(newPassword: string, hashPassword: string) {
        return await bcrypt.compare(newPassword, hashPassword);
    }

    public async generateAccessToken(
        details: { id: string; username: string; email: string, roles: $Enums.Roles },
        expiresIn?: string | number
    ) {
        return jwt.sign(details, ACCESS_TOKEN_SECRET, { expiresIn });
    }

    public async generateRefreshToken(details: {
        id: string;
        username: string;
        email: string;
        roles: $Enums.Roles
    }) {
        return jwt.sign(details, REFRESH_TOKEN_SECRET);
    }
}
export default PasswordHelpers;
