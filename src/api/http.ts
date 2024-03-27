import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import config from '~/constants/config';
import { clearLS, getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS, setRefreshTokenToLS } from '~/utils';
import { URL_LOGIN, URL_REFRESH_TOKEN } from './auth-api';
import { AuthResponse, RefreshTokenReponse } from '~/types/auth-type';
import HttpStatusCode from '~/constants/http-status-code-enum';
import { ErrorResponse } from '~/types/utils-type';
import { isAxiosUnauthorizedError } from '~/utils';

class Http {
   instance: AxiosInstance

   private accessToken: string
   private refreshToken: string
   private refreshTokenRequest: Promise<string> | null

   constructor() {
      this.accessToken = getAccessTokenFromLS()
      this.refreshToken = getRefreshTokenFromLS()
      this.refreshTokenRequest = null

      this.instance = axios.create({
         baseURL: config.baseUrl,
         //timeout: 10000,
         headers: {
            'Content-Type': 'application/json',
            // 'expire-access-token': 60 * 60 * 24, // 1 ngày
            // 'expire-refresh-token': 60 * 60 * 24 * 160 // 160 ngày
         }
      })

      this.instance.interceptors.request.use(
         (config) => {
            if (this.accessToken && config.headers) {
               config.headers.Authorization = this.accessToken
               return config
            }
            return config
         },
         (error) => {
            return Promise.reject(error)
         }
      )

      this.instance.interceptors.response.use(
         (response) => {
            const { url } = response.config
            if (url === URL_LOGIN) {
               const data = response.data as AuthResponse;
               this.accessToken = data.Result?.TaiKhoan?.Token || "";
               this.refreshToken = data.Result?.TaiKhoan?.RefreshToken || "";

               setAccessTokenToLS(this.accessToken)
               setRefreshTokenToLS(this.refreshToken)
            }
            return response.data
         },
         (error: AxiosError) => {
            console.log("---> error: AxiosError", error);

            // Chỉ toast lỗi không phải 422 và 401
            if (![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)) {
               const data: any | undefined = error.response?.data
               const message = data?.message || error.message
               toast.error(message)
            }

            // Lỗi Unauthorized (401) có rất nhiều trường hợp
            // - Token không đúng
            // - Không truyền token
            // - Token hết hạn*

            /*===== Nếu là lỗi 401 =====*/
            if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {


               // const config = error.response?.config || {}
               // // const { url } = config

               // console.log("config http.ts Nếu là lỗi 401: ", config);

               // // Trường hợp Token hết hạn và request đó không phải là của request refresh token
               // // thì chúng ta mới tiến hành gọi refresh token

               // if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
               //    // Hạn chế gọi 2 lần handleRefreshToken
               //    this.refreshTokenRequest = this.refreshTokenRequest
               //       ? this.refreshTokenRequest
               //       : this.handleRefreshToken().finally(() => {
               //          // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
               //          setTimeout(() => {
               //             this.refreshTokenRequest = null
               //          }, 10000)
               //       })

               //    return this.refreshTokenRequest.then((access_token) => {
               //       // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
               //       return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
               //    })
               // }



               /*
               Còn những trường hợp như:
                  + token không đúng
                  + không truyền token,
                  + token hết hạn nhưng gọi refresh token bị fail
                ==> thì tiến hành xóa local storage và toast message
               */

               clearLS()
               this.accessToken = ''
               this.refreshToken = ''
               toast.error(error.response?.data.Result?.message || error.response?.data.Message)
               // window.location.reload()
            }
            return Promise.reject(error)
         }
      )
   }

   // private handleRefreshToken() {
   //    return this.instance
   //       .post<RefreshTokenReponse>(URL_REFRESH_TOKEN, {
   //          AccessToken: this.accessToken,
   //          RefreshToken: this.refreshToken,
   //       })
   //       .then((res) => {
   //          const access_token = res.data.Result?.Token || ""
   //          setAccessTokenToLS(access_token)
   //          this.accessToken = access_token
   //          return access_token
   //       })
   //       .catch((error) => {
   //          clearLS()
   //          this.accessToken = ''
   //          this.refreshToken = ''
   //          throw error
   //       })
   // }
}

const http = new Http().instance
export default http