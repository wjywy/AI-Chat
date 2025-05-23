// src/stores/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../services/authService'

// 认证状态接口
interface AuthState {
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
