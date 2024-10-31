import { z } from "zod";
import "dotenv/config"

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test','production']).default('dev'),
    DATABASE_URL: z.string(),
    PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if(!_env.success){
    throw new Error('invalid enviroment')
}

export const env = _env.data