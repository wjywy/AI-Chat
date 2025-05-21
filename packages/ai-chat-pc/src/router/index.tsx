import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import CreateAccount from '../pages/CreateAccount'
import { AnimatedLayout } from '../components/PageTransition/PageTransition'
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute'
const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    {/* 受保护的路由 */}
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Home />} />
      {/* 其他需要登录才能访问的页面 */}
    </Route>

    {/* 不需要认证的路由 */}
    <Route element={<AnimatedLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
    </Route>
  </Route>
)
const router = createBrowserRouter(routes)

export default router
