// src/stores/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@pc/types/user'

// 使用Symbol作为私有键
const PRIVATE_AUTH_KEY = Symbol('auth')

// 认证状态接口
interface UserState {
  [PRIVATE_AUTH_KEY]: boolean
  get isAuthenticated(): boolean
  user: User | null
  token: string | null
  loading: boolean
  error: string | null

  // 方法
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  setAuthenticated: (value: boolean) => void
}

const userState = JSON.parse(localStorage.getItem('auth-storage') || '{}')

// 创建持久化存储的认证状态
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // 初始状态 - 私有
      [PRIVATE_AUTH_KEY]: userState.isAuthenticated || false,
      // 只读getter
      get isAuthenticated() {
        return get()[PRIVATE_AUTH_KEY]
      },
      user: userState.user || {},
      token: userState.token || null,
      loading: false,
      error: null,

      // 方法
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      setAuthenticated: (value) => set({ [PRIVATE_AUTH_KEY]: value })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token
      })
    }
  )
)
