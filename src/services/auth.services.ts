import { UserSignInDto } from "../configs/dtos/request/auth.request.dto";
import { DoSignUpInterface } from "../configs/interfaces/common.interfaces";
import prisma from "../prisma/prisma";
import PasswordHelpers from "../utils/passwordHelpers";

class AuthServices {
    public passwordHelper = new PasswordHelpers();

    public doSignUp = async ({
        username,
        email,
        password,
        role,
        dob,
    }: DoSignUpInterface) => {
        try {
            const hashedPassword =
                await this.passwordHelper.hashPassword(password);
            const user = await prisma.user.create({
                data: { username, email, password: hashedPassword, role, dob },
            });

            if (!user) {
                throw new Error("User not found");
            }

            return user;
        } catch (error) {
            throw error;
        }
    };

    public async doSignIn({ usernameOrEmail, password }: UserSignInDto) {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    OR: [
                        { username: usernameOrEmail },
                        { email: usernameOrEmail },
                    ],
                },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    password: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            if (!user) {
                throw new Error("User not found");
            }

            // Assuming you have a method to validate the password
            const isPasswordValid = await this.passwordHelper.comparePassword(
                password,
                user.password
            );

            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

            return user;
        } catch (error) {
            throw error;
        }
    }

    public async findUserById({ userId }: { userId: string }) {
        try {
            return await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
        } catch (error) {
            throw error;
        }
    }
}

export default AuthServices;
