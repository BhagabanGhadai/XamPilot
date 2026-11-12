import type { Context } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export const ResponseCode = {
  Success: 1,
  Error: 0,
} as const

export interface ErrorDetail {
  code: string
  details?: unknown
}

export interface SuccessResponse<T> {
  message: string
  data: T
  error: null
  meta: { code: typeof ResponseCode.Success }
}

export interface ErrorResponse {
  message: string
  data: null
  error: ErrorDetail
  meta: { code: typeof ResponseCode.Error }
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

export function success<T>(
  c: Context,
  data: T,
  message = 'Success',
  status: ContentfulStatusCode = 200,
) {
  const body: SuccessResponse<T> = {
    message,
    data,
    error: null,
    meta: { code: ResponseCode.Success },
  }
  return c.json(body, status)
}

export function failure(
  c: Context,
  message: string,
  error: ErrorDetail,
  status: ContentfulStatusCode = 500,
) {
  const body: ErrorResponse = {
    message,
    data: null,
    error,
    meta: { code: ResponseCode.Error },
  }
  return c.json(body, status)
}
