import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import { RequestHandler } from "express";
import { HTTP_STATUS_CODES } from "../configs/constants/statusCode.constants";

const errorFormatter = (
    errors: ValidationError[],
    errMessage: { [key: string]: string } = {},
    parentField: string | null = null
) => {
    // eslint-disable-next-line no-console
    console.log(errors, errMessage, parentField);
    const message = errMessage;
    let errorField = "";
    let validationList: string[];
    errors.forEach((error) => {
        errorField = parentField
            ? `${parentField}.${error.property}`
            : error?.property || "unk";
        if (!error?.constraints && error?.children?.length) {
            errorFormatter(error.children, message, errorField);
        } else {
            if (error?.constraints)
                validationList = Object.values(error?.constraints);
            else validationList = ["Invalid Value!"];
            if (typeof errorField === "string")
                message[errorField] = validationList.pop() || "";
        }
    });
    return message;
};

export const bodyValidationMiddleware =
    (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: any,
        skipMissingProperties = false,
        whitelist = true,
        forbidNonWhitelisted = true
    ): RequestHandler =>
    (req, res, next) => {
        validate(plainToInstance(type, req.body), {
            skipMissingProperties,
            whitelist,
            forbidNonWhitelisted,
        })
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    if (errors.length > 0) {
                        throw next({
                            status: HTTP_STATUS_CODES.BAD_REQUEST,
                            message: "Body Validation Failed!!!",
                            error: errorFormatter(errors),
                        });
                    }
                }
                next();
            })
            .catch((err) => next(err));
    };
