// packages/ai-chat-pc/src/App.tsx
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'

function App() {
  const { token, isAuthenticated, logout } = useAuthStore()

  useEffect(() => {
    // 如果有token但需要验证其有效性
    if (token && isAuthenticated) {
      const verifyToken = async () => {
        try {
          // Todo: 验证token, 失败则logout
          // 暂时用auth-token来验证
          if (token !== 'mock-token') {
            logout()
          }
          console.log('验证token:', token)
        } catch (error) {
          // 发生错误，注销用户
          console.error('token验证失败', error)
          logout()
        }
      }

      verifyToken()
    }
  }, [token, isAuthenticated, logout])

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
