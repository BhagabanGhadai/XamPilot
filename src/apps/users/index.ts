import type { AppModule } from '@/shared/types/module'
import { usersRoutes } from './users.routes'

// Public API of the module — other modules import only from here.
export { usersService } from './users.service'
export { UserEvents, type User } from './users.types'

export const usersModule: AppModule = {
  name: 'users',
  basePath: '/users',
  routes: usersRoutes,
}
