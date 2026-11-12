import type { User } from './users.types'

// In-memory store for now; swap for a real DB implementation later.
const users = new Map<string, User>()

export const usersRepository = {
  findAll: async (): Promise<User[]> => [...users.values()],
  findById: async (id: string): Promise<User | undefined> => users.get(id),
  save: async (user: User): Promise<User> => {
    users.set(user.id, user)
    return user
  },
}
