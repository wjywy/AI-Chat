import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

interface ProtectedRouteProps {
  redirectPath?: string
}

export function ProtectedRoute({ redirectPath = '/login' }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    // 如果未认证，重定向到登录页面，同时保存尝试访问的URL
    return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />
  }

  // 已认证，允许访问子路由
  return <Outlet />
}
