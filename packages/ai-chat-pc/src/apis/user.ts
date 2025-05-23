import { request } from '@pc/utils'
import type { loginInfoType, LoginResponse } from '@pc/types/user'

export const loginAPI = (data: loginInfoType) => {
  return request<LoginResponse>('/resume/user/login', 'POST', data)
}
