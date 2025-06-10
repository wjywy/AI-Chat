import { XProvider } from '@ant-design/x'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import '@pc/locales'
import ThemeToggle from '@pc/components/ThemeToggle'
import { useUserStore, useLocaleStore, useThemeStore } from '@pc/store'

function App() {
  const { isAuthenticated, error } = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated && error) {
      navigate('/login')
      useUserStore.setState({ error: null })
    }
  }, [isAuthenticated, error, navigate])

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
          <Outlet />
          <ThemeToggle />
        </div>
      </XProvider>
    </ConfigProvider>
  )
}

export default App
