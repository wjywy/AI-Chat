// packages/ai-chat-pc/src/router/index.tsx

import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import CreateAccount from '../pages/CreateAccount'
import { PageTransition } from '../components/PageTransition/PageTransition'
import { createBrowserRouter, createRoutesFromElements, Route, Outlet } from 'react-router-dom'
import { WithPermission } from '../components/WithPermission/WithPermission'

// 统一的路由配置
const routes = [
  {
    path: '/',
    element: <Home />,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
    meta: {
      requiresAuth: false
    }
  }
]

// 创建React Router路由
const routeElements = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route
      element={
        <PageTransition>
          <Outlet />
        </PageTransition>
      }>
      <Route
        path="/"
        element={
          <WithPermission>
            <Home />
          </WithPermission>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
    </Route>
  </Route>
)

const router = createBrowserRouter(routeElements)

export default router
