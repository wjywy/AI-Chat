import React from 'react'
import { createRoot } from 'react-dom/client'
import { XProvider } from '@ant-design/x'
import Popup from './Popup'

import './styles.css'

/**
 * Popup页面应用启动文件
 
 */

const rootElement = document.getElementById('popup-root')

const root = createRoot(rootElement!)

root.render(
  <React.StrictMode>
    <XProvider>
      <Popup />
    </XProvider>
  </React.StrictMode>
)
