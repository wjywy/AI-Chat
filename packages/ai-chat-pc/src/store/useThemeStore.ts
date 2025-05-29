import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeType = 'light' | 'dark'

type ThemeState = {
  theme: ThemeType
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light'
          document.documentElement.classList.toggle('dark', newTheme === 'dark')
          return { theme: newTheme }
        })
    }),
    { name: 'theme-storage' }
  )
)

export const initializeTheme = () => {
  const theme = useThemeStore.getState().theme
  document.documentElement.classList.toggle('dark', theme === 'dark')
}
