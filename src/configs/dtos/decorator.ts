import { ValidateIf } from "class-validator";

// Define a custom decorator for checking either username or email
export function IsEither() {
    return ValidateIf((o, value) => {
        return (
            value === undefined ||
            value === null ||
            (typeof value === "string" && value.trim() !== "")
        );
    });
}
