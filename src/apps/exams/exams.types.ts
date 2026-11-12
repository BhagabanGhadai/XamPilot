export interface Exam {
  id: string
  title: string
  durationMinutes: number
  createdBy: string
  createdAt: Date
}

export interface CreateExamInput {
  title: string
  durationMinutes: number
  createdBy: string
}
