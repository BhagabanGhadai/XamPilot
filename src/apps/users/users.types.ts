import type { users } from './users.schema'

export type User = typeof users.$inferSelect

export type CreateUserInput = Pick<typeof users.$inferInsert, 'name' | 'email'>

export const UserEvents = {
  Created: 'users.created',
} as const
