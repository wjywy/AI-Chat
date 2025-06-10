import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { User } from '@pc/types/user'

// 认证状态接口
interface UserState {
  // 状态
  isAuthenticated: boolean
  user: User | null
  token: string | null
  loading: boolean
  error: string | null

  // 方法
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

const userState = JSON.parse(localStorage.getItem('auth-storage') || '{}')

// 创建持久化存储的认证状态
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // 初始状态
      isAuthenticated: userState.isAuthenticated || false,
      user: userState.user || {},
      token: userState.token || null,
      loading: false,
      error: null,

      // 方法
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
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
