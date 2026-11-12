import type { ErrorHandler, NotFoundHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { AppError } from '../errors/app.error'
import { failure } from '../http/response'

export const errorHandler: ErrorHandler = (err, c) => {
  if (err instanceof AppError) {
    return failure(c, err.message, { code: err.code, details: err.details }, err.status)
  }
  // Errors thrown by Hono itself (e.g. malformed JSON body)
  if (err instanceof HTTPException) {
    return failure(c, err.message || 'Request failed', { code: 'HTTP_ERROR' }, err.status)
  }
  // Malformed JSON body from c.req.json()
  if (err instanceof SyntaxError) {
    return failure(c, 'Invalid JSON body', { code: 'INVALID_JSON' }, 400)
  }
  console.error(err)
  return failure(c, 'Internal server error', { code: 'INTERNAL_ERROR' }, 500)
}

export const notFoundHandler: NotFoundHandler = (c) =>
  failure(c, 'Route not found', { code: 'NOT_FOUND' }, 404)
