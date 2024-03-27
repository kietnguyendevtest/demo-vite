export interface SuccessResponse<Data> {
  Success: boolean
  Message: string
  Result?: Data
}
export interface ErrorResponse<Data> {
  Success?: boolean
  Message: string
  Result?: Data
}

// cú pháp `-?` sẽ loại bỏ undefiend của key optional

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
