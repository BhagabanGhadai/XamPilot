import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { modules } from './apps'
import { errorHandler, notFoundHandler } from './shared/middleware/error.middleware'

export async function createApp() {
  const app = new Hono()

  app.use('*', logger())
  app.onError(errorHandler)
  app.notFound(notFoundHandler)
  const api = new Hono()
  for (const mod of modules) {
    await mod.init?.()
    api.route(mod.basePath, mod.routes)
  }
  app.route('/api', api)

  return app
}
