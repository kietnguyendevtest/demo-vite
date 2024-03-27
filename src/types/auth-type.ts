import { Account } from './account-type'
import { SuccessResponse } from './utils-type'

export type AuthResponse = SuccessResponse<{
   TaiKhoan: Account
   PhanQuyen: [{
      ControllerName: string,
      IsXem: boolean,
      IsThem: boolean,
      IsCapNhat: boolean,
      IsXoa: boolean,
      IsDuyet: boolean,
      IsThongKe: boolean,
      IsImport: boolean,
      IsExport: boolean
   }]
   Menu: string
   NhomQuyen: number
}>

export type RefreshTokenReponse = SuccessResponse<{
   Token: string,
   RefreshToken: string
}>
