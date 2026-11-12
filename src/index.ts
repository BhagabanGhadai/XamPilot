import { env } from './config/env'
import { createApp } from './app'

const app = await createApp()

export default {
  port: env.PORT,
  fetch: app.fetch,
}
