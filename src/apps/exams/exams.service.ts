import { NotFoundError, ValidationError } from '@/shared/errors/app.error'
// Cross-module dependency goes through the other module's public index only.
import { usersService } from '@/apps/users'
import { examsRepository } from './exams.repository'
import type { CreateExamInput, Exam } from './exams.types'

export const examsService = {
  list: () => examsRepository.findAll(),

  async getById(id: string) {
    const exam = await examsRepository.findById(id)
    if (!exam) throw new NotFoundError('Exam')
    return exam
  },

  async create(input: CreateExamInput) {
    if (!input?.title || !input?.durationMinutes || !input?.createdBy) {
      throw new ValidationError('title, durationMinutes and createdBy are required')
    }
    await usersService.getById(input.createdBy) // ensures the author exists
    const exam: Exam = { id: crypto.randomUUID(), ...input, createdAt: new Date() }
    return examsRepository.save(exam)
  },
}
