import { message } from 'antd'
import axios, { type AxiosError, type Method } from 'axios'

// 请求实例
const instance = axios.create({
  baseURL: '', // 基地址
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // TODO：在发送请求之前校验token，并在请求头添加token
    return config
  },
  function (error) {
    // 对请求错误做些什么
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

type Data<T> = {
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
export const request = <T>(url: string, method: Method = 'GET', submitData?: object) => {
  return instance.request<any, Data<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}
