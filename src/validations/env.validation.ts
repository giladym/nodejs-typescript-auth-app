import { z} from 'zod';

export const envSchema = z.object({ 
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(5000), // Coercion for primitives
    MONGO_DB_URI: z.string().url(),     
});

export type Env = z.infer<typeof envSchema>;