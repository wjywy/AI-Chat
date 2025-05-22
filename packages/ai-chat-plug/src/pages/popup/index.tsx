import React from 'react'
import { createRoot } from 'react-dom/client'
import { XProvider } from '@ant-design/x'
import Popup from './Popup'

import './styles.css'

// 渲染弹出窗口
const root = createRoot(document.getElementById('popup-root')!)

root.render(
  <React.StrictMode>
    <XProvider>
      <Popup />
    </XProvider>
  </React.StrictMode>
)
