export type ErrorCode = string
export type ErrorMessage = string

export type EngineResponse<SuccessData, ErrorData> = {
  success: boolean
  data?: SuccessData
  error?: {
    code: ErrorCode
    data?: ErrorData
    message?: ErrorMessage
  }
}

export function engineResponse<SD, ED = never>(payload: SD): EngineResponse<SD, ED>

export function engineResponse<SD, ED>(payload: {
  errorCode: ErrorCode
  data?: ED
  message?: ErrorMessage
}): EngineResponse<SD, ED>

export function engineResponse<SD, ED>(payload: any): EngineResponse<SD, ED> {
  if (typeof payload === 'object' && 'errorCode' in payload) {
    return {
      success: false,
      error: {
        code: payload.errorCode,
        ...(payload.data ? { data: payload.data } : {}),
        ...(payload.message ? { message: payload.message } : {}),
      },
    }
  }

  return { success: true, data: payload }
}
