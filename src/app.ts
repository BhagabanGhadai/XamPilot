import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { modules } from './modules'
import { errorHandler } from './shared/middleware/error-handler'

export async function createApp() {
  const app = new Hono()

  app.use('*', logger())
  app.onError(errorHandler)
  app.notFound((c) => c.json({ error: { code: 'NOT_FOUND', message: 'Route not found' } }, 404))

  app.get('/health', (c) => c.json({ status: 'ok' }))

  const api = new Hono()
  for (const mod of modules) {
    await mod.init?.()
    api.route(mod.basePath, mod.routes)
  }
  app.route('/api', api)

  return app
}
