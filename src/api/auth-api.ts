import { AuthResponse } from '../types/auth-type'
import http from './http'

export const URL_LOGIN = 'TaiKhoan/login'
export const URL_REFRESH_TOKEN = 'TaiKhoan/refresh'

const authApi = {
   login(params: { username: string; password: string }) {
      return http.post<AuthResponse>(URL_LOGIN, params)
   },
}

export default authApi
