import type { Hono } from 'hono'

/**
 * Contract every module implements. A module owns its routes, services and
 * data access, and is mounted by the app under its own base path.
 */
export interface AppModule {
  name: string
  basePath: string
  routes: Hono
  /** Optional hook for subscribing to events, warming caches, etc. */
  init?: () => void | Promise<void>
}
