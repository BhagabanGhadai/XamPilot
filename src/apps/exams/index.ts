import { eventBus } from '@/shared/events/event-bus'
import type { AppModule } from '@/shared/types/module'
import { UserEvents, type User } from '@/apps/users'
import { examsRoutes } from './exams.routes'

export { examsService } from './exams.service'
export type { Exam } from './exams.types'

export const examsModule: AppModule = {
  name: 'exams',
  basePath: '/exams',
  routes: examsRoutes,
  init() {
    // Example of event-driven integration between modules.
    eventBus.on<User>(UserEvents.Created, (user) => {
      console.log(`[exams] new user registered: ${user.email}`)
    })
  },
}
