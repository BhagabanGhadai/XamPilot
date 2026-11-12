import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string({ error: 'Name is required' }).trim().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
})
