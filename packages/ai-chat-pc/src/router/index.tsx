// packages/ai-chat-pc/src/router/index.tsx
import { createBrowserRouter, createRoutesFromElements, Route, Outlet } from 'react-router-dom'

import App from '@pc/App'
import Home from '@pc/pages/Home'
import Login from '@pc/pages/Login'
import CreateAccount from '@pc/pages/CreateAccount'
import { ConversationDetail } from '@pc/pages/ConversationDetail'

import { PageTransition } from '@pc/components/PageTransition/PageTransition'
import { WithPermission } from '@pc/components/WithPermission/WithPermission'
import { LayoutWithSidebar } from '@pc/components/Layout/LayoutWithSidebar'

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
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
    </Route>
    <Route
      element={
        <WithPermission>
          <LayoutWithSidebar />
        </WithPermission>
      }>
      <Route path="/" element={<Home />} />
      <Route path="/conversation/:id" element={<ConversationDetail />} />
    </Route>
  </Route>
)

const router = createBrowserRouter(routeElements)

export default router
