import { config } from "dotenv";
import { EnvConfig } from "./interfaces/config.interface";

config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export const {
    DATABASE_URL,
    PORT,
    NODE_ENV,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
} = process.env as unknown as EnvConfig;
