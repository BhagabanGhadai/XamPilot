import { eventBus } from '@/shared/events/event-bus'
import { NotFoundError } from '@/shared/errors/app.error'
import { usersRepository } from './users.repository'
import { UserEvents, type CreateUserInput, type User } from './users.types'

export const usersService = {
  list: () => usersRepository.findAll(),

  async getById(id: string) {
    const user = await usersRepository.findById(id)
    if (!user) throw new NotFoundError('User')
    return user
  },

  async create(input: CreateUserInput) {
    const user: User = { id: crypto.randomUUID(), ...input, createdAt: new Date() }
    await usersRepository.save(user)
    await eventBus.emit(UserEvents.Created, user)
    return user
  },
}
