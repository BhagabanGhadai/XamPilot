import { Hono } from 'hono'
import { examsService } from './exams.service'

export const examsRoutes = new Hono()
  .get('/', async (c) => c.json(await examsService.list()))
  .get('/:id', async (c) => c.json(await examsService.getById(c.req.param('id'))))
  .post('/', async (c) => c.json(await examsService.create(await c.req.json()), 201))
