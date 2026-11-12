import type { AppModule } from '@/shared/types/module'
import { examsModule } from './exams'
import { usersModule } from './users'

// Register new modules here.
export const modules: AppModule[] = [usersModule, examsModule]
