import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  DB_FILE_NAME: z.string().trim().min(1, 'DB_FILE_NAME is required'),
})

export type Env = z.infer<typeof envSchema>

function loadEnv(): Env {
  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    console.error('❌ Invalid environment variables:\n' + z.prettifyError(result.error))
    process.exit(1)
  }

  return result.data
}

export const env = Object.freeze(loadEnv())
