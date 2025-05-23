import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

// API响应类型
interface ApiResponse<T = any> {
  code: number
  msg: string
  data: T
}

// 用户信息类型
interface UserInfo {
  nickName: string
  token: string
}

// 创建axios实例
const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000 // 请求超时时间
})

// 请求拦截器：添加token等
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth-storage')
      ? JSON.parse(localStorage.getItem('auth-storage') || '{}').state?.token
      : null

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: any) => Promise.reject(error)
)

// 响应拦截器：统一处理错误等
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: any) => Promise.reject(error)
)

// 认证相关接口
export const authApi = {
  // 登录
  login: (userName: string, password: string): Promise<ApiResponse<UserInfo>> => {
    return api.post('/users/login', {
      userName,
      password
    })
  },

  // 注册
  register: (
    userName: string,
    password: string,
    nickName: string,
    captcha: string
  ): Promise<ApiResponse<null>> => {
    return api.post('/users/register', {
      userName,
      password,
      nickName,
      captcha
    })
  },

  // 发送验证码
  sendCaptcha: (address: string): Promise<ApiResponse<null>> => {
    return api.get('/users/register-captcha', {
      params: { address }
    })
  }
}

export default api
