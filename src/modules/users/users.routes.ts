import { Hono } from 'hono'
import { usersService } from './users.service'

export const usersRoutes = new Hono()
  .get('/', async (c) => c.json(await usersService.list()))
  .get('/:id', async (c) => c.json(await usersService.getById(c.req.param('id'))))
  .post('/', async (c) => c.json(await usersService.create(await c.req.json()), 201))
