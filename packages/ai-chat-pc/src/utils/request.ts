import { message } from 'antd'
import axios, { type AxiosError, type Method } from 'axios'

import { BASE_URL } from '@pc/constant'
import router from '@pc/router'
import { useUserStore } from '@pc/store/useUserStore'

// 请求实例
const instance = axios.create({
  baseURL: BASE_URL, // 基地址
  timeout: 30000
})

// 免token鉴权白名单
const whiteList = ['/users/login', '/users/register', '/users/register-captcha']

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
    // 注意，请求状态码!==业务状态码
    const { code, msg } = response.data
    console.log('响应拦截器', code, msg)
    // 业务统一状态码出错
    if (code === 400 || code === 401 || code === 404) {
      message.error(msg || '请求出错, 请稍后再试')
      return
    }

    console.log('响应拦截器', response.data)
    // 数据剥离
    return response.data
  },
  function (error: AxiosError) {
    const { status } = error
    if (status === 401) {
      message.warning('当前登录状态有误, 请重新登录')
      // 这里后续可以记录用户上次访问的路径，登录成功后再回跳回来，先直接replace
      router.navigate('/login', {
        replace: true
      })
    } else {
      // 其他请求状态码出错
      // message.error(`error: ${status}`)
    }
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return instance.request<any, Data<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData,
    signal: options?.signal
  })
}
