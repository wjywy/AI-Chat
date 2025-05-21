import { Outlet } from 'react-router-dom'
import { XProvider } from '@ant-design/x'
import { theme as antdTheme } from 'antd'
import useLocaleStore from '@pc/store/useLocaleStore'
import '@pc/locales'
import useThemeStore from '@pc/store/useThemeStore'
import ThemeToggle from '@pc/components/ThemeToggle'

const App = () => {
  const { antdLocale } = useLocaleStore()
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  return (
    <XProvider
      locale={antdLocale}
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorBgContainer: isDark ? '#1f1f1f' : undefined
        }
      }}>
      <div className="min-h-screen">
        <Outlet />
        <ThemeToggle />
      </div>
      <Outlet />
    </XProvider>
  )
}

export default App
