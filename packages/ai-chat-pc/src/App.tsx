// packages/ai-chat-pc/src/App.tsx
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { XProvider } from '@ant-design/x'
import { ConfigProvider, theme as antdTheme } from 'antd'
import useLocaleStore from '@pc/store/useLocaleStore'
import '@pc/locales'
import useThemeStore from '@pc/store/useThemeStore'
import ThemeToggle from '@pc/components/ThemeToggle'
import LanguageSwitch from '@pc/components/LanguageSwitch'
import { useAuthStore } from './store/useAuthStore'
import { AuthService } from './services/authService'
function App() {
  const { token, isAuthenticated } = useAuthStore()
  useEffect(() => {
    // 如果有token但需要验证其有效性
    if (token && isAuthenticated) {
      const verifyToken = async () => {
        try {
          if (token !== 'mock-token') {
            AuthService.logout()
          }
          console.log('验证token:', token)
        } catch (error) {
          // 发生错误，注销用户
          console.error('token验证失败', error)
          AuthService.logout()
        }
      }

      verifyToken()
    }
  }, [token, isAuthenticated])

  const { antdLocale } = useLocaleStore()
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  const themeConfig = {
    algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorBgContainer: isDark ? '#141414' : undefined
    }
  }
  return (
    <ConfigProvider locale={antdLocale} theme={themeConfig}>
      <XProvider theme={themeConfig}>
        <div className="min-h-screen">
          <LanguageSwitch />
          <Outlet />
          <ThemeToggle />
        </div>
      </XProvider>
    </ConfigProvider>
  )
}

export default App
