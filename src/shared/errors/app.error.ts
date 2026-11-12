import type { ContentfulStatusCode } from 'hono/utils/http-status'

export class AppError extends Error {
  constructor(
    message: string,
    public readonly status: ContentfulStatusCode = 500,
    public readonly code = 'INTERNAL_ERROR',
    public readonly details?: unknown,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND')
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR', details)
  }
}
