// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './router'
import './styles/index.css'
createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}></RouterProvider>
)
