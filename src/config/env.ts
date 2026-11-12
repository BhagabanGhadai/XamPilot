
export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 3000),
  DB_FILE_NAME: process.env.DB_FILE_NAME,
} as const
