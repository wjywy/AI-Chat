// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import './index.css'
import router from './router'
import './locales'
import { initializeTheme } from './store/useThemeStore'
import './styles/index.css'
// 初始化主题
initializeTheme()

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}></RouterProvider>
)
