import { authApi } from './api'
import { useAuthStore } from '../store/useAuthStore'

export interface User {
  id?: string
  username?: string
  email?: string
  avatar?: string
  nickName: string
}

export const authService = {
  async login(userName: string, password: string) {
    try {
      useAuthStore.getState().setLoading(true)
      useAuthStore.getState().setError(null)

      const response = await authApi.login(userName, password)

      if (response.code === 1) {
        useAuthStore.setState({
          isAuthenticated: true,
          user: {
            nickName: response.data.nickName
          },
          token: response.data.token,
          loading: false,
          error: null
        })
      } else {
        throw new Error(response.msg || '登录失败')
      }
    } catch (error) {
      useAuthStore.setState({
        loading: false,
        error: error instanceof Error ? error.message : '登录失败'
      })
      throw error
    }
  },

  async createAccount(userName: string, password: string, nickName: string, captcha: string) {
    try {
      useAuthStore.getState().setLoading(true)
      useAuthStore.getState().setError(null)

      const response = await authApi.register(userName, password, nickName, captcha)

      if (response.code === 1) {
        // 注册成功后，自动登录
        await this.login(userName, password)
      } else {
        throw new Error(response.msg || '注册失败')
      }
    } catch (error) {
      useAuthStore.setState({
        loading: false,
        error: error instanceof Error ? error.message : '注册失败'
      })
      throw error
    }
  },

  async sendCaptcha(address: string) {
    try {
      useAuthStore.getState().setLoading(true)
      useAuthStore.getState().setError(null)

      const response = await authApi.sendCaptcha(address)

      if (response.code !== 1) {
        throw new Error(response.msg || '验证码发送失败')
      }

      useAuthStore.getState().setLoading(false)
    } catch (error) {
      useAuthStore.setState({
        loading: false,
        error: error instanceof Error ? error.message : '验证码发送失败'
      })
      throw error
    }
  },

  logout() {
    useAuthStore.setState({
      isAuthenticated: false,
      user: null,
      token: null,
      error: null
    })
  }
}
