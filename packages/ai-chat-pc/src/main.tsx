// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SearchChat from './pages/SearchChat'
import './index.css'
import router from './router'
import './locales'
import { initializeTheme } from './store/useThemeStore'
import './styles/index.css'
// 初始化主题
initializeTheme()

createRoot(document.getElementById('root')!).render(<SearchChat />)
