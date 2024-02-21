import { Response } from "express";

export default class HttpException extends Error {
    public status: number;

    public message: string;

    public errors: Array<string> | NonNullable<unknown>;

    private res: Response;

    constructor(
        status: number,
        message: string,
        errors: Array<string> | NonNullable<unknown> = [],
        res: Response
    ) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
        this.res = res;
        this.handler();
    }

    private handler() {
        return this.res.status(this.status).json({
            success: false,
            message: this.message,
            errors: this.errors,
        });
    }
}
