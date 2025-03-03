import { z} from 'zod';

export const envSchema = z.object({ 
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(5000), // Coercion for primitives
    MONGO_DB_URI: z.string().url(),
    JWT: z.string({ required_error: "JWT is required" }),
    JWT_REFRESH: z.string({ required_error: "JWT Refresh is required" }),
    VERIFICATION_CODE_EXP: z.coerce.number().default(600),  
});

export type EnvConfig = z.infer<typeof envSchema>;