// src/stores/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 用户类型定义
interface User {
  id: string
  username: string
  email: string
  avatar?: string
}

// 认证状态接口
interface AuthState {
  // 状态
  isAuthenticated: boolean
  user: User | null
  token: string | null
  loading: boolean
  error: string | null

  // 方法
  login: (email: string, password: string) => Promise<void>
  createAccount: (email: string, password: string, username: string) => Promise<void>
  //   loginWithGoogle: () => Promise<void>
  //   loginWithMicrosoft: () => Promise<void>
  //   loginWithApple: () => Promise<void>
  //   loginWithPhone: (phone: string, code: string) => Promise<void>
  logout: () => void
  clearError: () => void
}

// 创建持久化存储的认证状态
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 初始状态
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null,

      // 登录方法
      login: async (email, password) => {
        try {
          set({ loading: true, error: null })

          // TODO: 实现登录逻辑，调用API
          // const response = await api.post('/auth/login', { email, password })

          // 模拟登录成功

          // 设置登录状态
          set({
            isAuthenticated: true,
            user: { id: '1', username: 'user1', email },
            token: 'mock-token',
            loading: false
          })
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : '登录失败'
          })
        }
      },

      // 注册方法
      createAccount: async (email, password, username) => {
        try {
          set({ loading: true, error: null })

          // TODO: 实现注册逻辑，调用API
          // const response = await api.post('/auth/register', { email, password, username })

          // 模拟注册成功
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // 设置登录状态
          set({
            isAuthenticated: true,
            user: { id: '1', username, email },
            token: 'mock-token',
            loading: false
          })
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : '注册失败'
          })
        }
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null
        })
      },
      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage', // localStorage的键名
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token
      }) // 只持久化这些字段
    }
  )
)
