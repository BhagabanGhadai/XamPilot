import type { exams } from './exams.schema'

export type Exam = typeof exams.$inferSelect

export type CreateExamInput = Pick<typeof exams.$inferInsert, 'title' | 'durationMinutes' | 'createdBy'>
