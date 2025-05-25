import { message } from 'antd'
import axios, { type AxiosError, type Method } from 'axios'
import { userService } from '@pc/services/userService.ts'
import { useUserStore } from '@pc/store/useUserStore'
// 请求实例
const instance = axios.create({
  baseURL: 'http://we4c8e87.natappfree.cc', // 基地址
  timeout: 5000
})

// 免token鉴权白名单
const whiteList = ['/users/login', '/users/register', '/users/register-captcha']

// token过期检查
const isTokenExpired = (token: string): boolean => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(window.atob(base64))
    return payload.exp < Date.now() / 1000
  } catch (error) {
    console.error('Token解析错误', error)
    return true
  }
}

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 检查是否在白名单中
    const isWhitelisted = whiteList.some((url) => config.url?.includes(url))

    // 如果在白名单中，不需要token验证
    if (isWhitelisted) {
      return config
    }

    const { token } = useUserStore.getState()

    // 检查token是否存在
    if (!token) {
      message.error('请先登录再操作')
      // 这里只设置错误状态，实际跳转由组件完成
      // 避免在拦截器中直接操作路由
      useUserStore.setState({ error: '请先登录' })
      return Promise.reject(new Error('未登录'))
    }

    // 检查token是否过期
    if (isTokenExpired(token)) {
      message.error('登录已过期，请重新登录')
      // 清除登录状态
      userService.logout()
      return Promise.reject(new Error('登录已过期'))
    }

    // 添加token到请求头
    config.headers['Authorization'] = `${token}`

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数
    // 注意，请求状态码!==业务状态码
    const { code, msg } = response.data

    // 业务统一状态码出错
    if (code === 0) {
      message.error(msg || '请求出错, 请稍后再试')
      return
    }
    // 数据剥离
    return response.data
  },
  function (error: AxiosError) {
    // 401错误拦截(无感刷新...)
    return Promise.reject(error)
  }
)

export type Data<T> = {
  data: T
  code: string | number
  msg: string | null
}

/**
 * @param url 接口地址
 * @param method 请求方法(默认为GET)
 * @param submitData 请求数据(可选)
 * @returns
 */
export const request = <T>(
  url: string,
  method: Method = 'GET',
  submitData?: object,
  options?: { signal?: AbortSignal }
) => {
  return instance.request<any, Data<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData,
    signal: options?.signal
  })
}
