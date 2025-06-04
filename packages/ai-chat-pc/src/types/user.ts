// 用户信息类型
export interface UserInfo {
  nickName: string
  token: string
}

export interface User {
  id?: string
  username?: string
  email?: string
  avatar?: string
  nickName: string
}

// 登录请求参数
export interface LoginParams {
  userName: string
  password: string
}

// 注册请求参数
export interface RegisterParams {
  userName: string
  password: string
  nickName: string
  captcha: string
}

// 验证码请求参数
export interface CaptchaParams {
  address: string
}

// export type { UserInfo, User }
