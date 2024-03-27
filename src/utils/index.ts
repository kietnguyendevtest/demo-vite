import axios, { AxiosError } from 'axios'
import HttpStatusCode from '~/constants/http-status-code-enum'
//import { ErrorResponse } from '~/types/utils-type'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
   return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
   return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
   return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

// export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
//    return (
//       isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
//       error.response?.data?.data?.name === 'EXPIRED_TOKEN'
//    )
// }

/*===== Local Storage =====*/
export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (access_token: string) => {
   localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenToLS = (refresh_token: string) => {
   localStorage.setItem('refresh_token', refresh_token)
}

export const clearLS = () => {
   localStorage.removeItem('access_token')
   localStorage.removeItem('refresh_token')
   localStorage.removeItem('profile')

   const clearLSEvent = new Event('clearLS')
   LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''

export const getProfileFromLS = () => {
   const result = localStorage.getItem('profile')
   return result ? JSON.parse(result) : null
}