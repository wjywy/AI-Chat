import { request } from '@pc/utils'
// 导入Data类型和参数类型
import type { Data } from '@pc/utils/request'
import type { LoginParams, RegisterParams, CaptchaParams, UserInfo } from '@pc/types/user'

// 认证相关接口
export const authApi = {
  // 登录
  login: (params: LoginParams): Promise<Data<UserInfo>> => {
    return request<UserInfo>('/users/login', 'POST', params)
  },

  // 注册
  register: (params: RegisterParams): Promise<Data<null>> => {
    return request<null>('/users/register', 'POST', params)
  },

  // 发送验证码
  sendCaptcha: (params: CaptchaParams): Promise<Data<null>> => {
    return request<null>('/users/register-captcha', 'GET', params)
  }
}
