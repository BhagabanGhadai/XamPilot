import { Hono } from 'hono'
import { success } from '@/shared/http/response'
import { usersService } from './users.service'

export const usersRoutes = new Hono()
  .get('/', async (c) => success(c, await usersService.list(), 'Users fetched successfully'))
  .get('/:id', async (c) =>
    success(c, await usersService.getById(c.req.param('id')), 'User fetched successfully'),
  )
  .post('/', async (c) =>
    success(c, await usersService.create(await c.req.json()), 'User created successfully', 201),
  )
