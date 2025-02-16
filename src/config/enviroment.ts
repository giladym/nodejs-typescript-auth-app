import dotenv, { config } from "dotenv";
import { envSchema , Env } from "../validations/env.validation";
import { ZodError } from "zod";

dotenv.config();
const envObj = config({ path: `./.env.${process.env.NODE_ENV}` }).parsed;

export const env = () => {
    try {
        const enviroment: Env = envSchema.parse(envObj);
        return {
            port: enviroment.PORT,
            nodeEnv: enviroment.NODE_ENV,
            mongoDbUri: enviroment.MONGO_DB_URI
        }
    } catch (error) {
        if ( error instanceof ZodError) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            console.error('Validation failed:', error.errors);
        }
        else {
            console.error('Error parsing environment variables:', error);
        }
    }
}