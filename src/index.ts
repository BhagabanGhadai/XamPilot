import { createApp } from './app'
import { env } from './config/env'

const app = await createApp()

export default {
  port: env.PORT,
  fetch: app.fetch,
}
