import { IsString, IsEmail, IsNotEmpty, IsDateString } from "class-validator";
import { IsEither } from "../decorator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsDateString()
    @IsNotEmpty()
    dob: string;

    constructor(
        username: string,
        email: string,
        password: string,
        dob: string
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.dob = dob;
    }
}

export class UserSignInDto {
    @IsString()
    @IsEither()
    usernameOrEmail: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    constructor(password: string, usernameOrEmail: string) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
    }
}
