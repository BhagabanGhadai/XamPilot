import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { modules } from './apps'
import { success } from './shared/http/response'
import { errorHandler, notFoundHandler } from './shared/middleware/error.middleware'

export async function createApp() {
  const app = new Hono()

  app.use('*', logger())
  app.onError(errorHandler)
  app.notFound(notFoundHandler)

  app.get('/health', (c) => success(c, { status: 'ok' }, 'Service is healthy'))

  const api = new Hono()
  for (const mod of modules) {
    await mod.init?.()
    api.route(mod.basePath, mod.routes)
  }
  app.route('/api', api)

  return app
}
