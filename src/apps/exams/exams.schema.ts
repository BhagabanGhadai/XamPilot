import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
// Schema files import each other directly (not via the module index) so
// drizzle-kit can load them without pulling in routes/services.
import { users } from '../users/users.schema'

export const exams = sqliteTable('exams', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  createdBy: text('created_by')
    .notNull()
    .references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})
