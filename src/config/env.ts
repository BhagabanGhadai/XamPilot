import * as v from 'valibot'

const envSchema = v.object({
  NODE_ENV: v.optional(v.picklist(['development', 'production', 'test']), 'development'),
  PORT: v.optional(
    v.pipe(
      v.string(),
      v.transform(Number),
      v.number('PORT must be a number'),
      v.integer('PORT must be an integer'),
      v.minValue(1, 'PORT must be between 1 and 65535'),
      v.maxValue(65535, 'PORT must be between 1 and 65535'),
    ),
    '3000',
  ),
  DB_FILE_NAME: v.pipe(
    v.string('DB_FILE_NAME is required'),
    v.trim(),
    v.nonEmpty('DB_FILE_NAME is required'),
  ),
})

export type Env = v.InferOutput<typeof envSchema>

function loadEnv(): Env {
  const result = v.safeParse(envSchema, process.env)

  if (!result.success) {
    console.error('❌ Invalid environment variables:\n' + v.summarize(result.issues))
    process.exit(1)
  }

  return result.output
}

export const env = Object.freeze(loadEnv())
