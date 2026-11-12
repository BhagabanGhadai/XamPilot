import type { Exam } from './exams.types'

// In-memory store for now; swap for a real DB implementation later.
const exams = new Map<string, Exam>()

export const examsRepository = {
  findAll: async (): Promise<Exam[]> => [...exams.values()],
  findById: async (id: string): Promise<Exam | undefined> => exams.get(id),
  save: async (exam: Exam): Promise<Exam> => {
    exams.set(exam.id, exam)
    return exam
  },
}
