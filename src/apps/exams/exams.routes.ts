import { Hono } from 'hono'
import { success } from '@/shared/http/response'
import { examsService } from './exams.service'

export const examsRoutes = new Hono()
  .get('/', async (c) => success(c, await examsService.list(), 'Exams fetched successfully'))
  .get('/:id', async (c) =>
    success(c, await examsService.getById(c.req.param('id')), 'Exam fetched successfully'),
  )
  .post('/', async (c) =>
    success(c, await examsService.create(await c.req.json()), 'Exam created successfully', 201),
  )
