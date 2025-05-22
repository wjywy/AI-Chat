import React from 'react'
import { createRoot } from 'react-dom/client'
import { XProvider } from '@ant-design/x'
import ChatBubble from './components/ChatBubble'
import './content.css'

// 创建容器元素
const container = document.createElement('div')
container.id = 'ai-chat-root'
document.body.appendChild(container)

// 渲染聊天气泡
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <XProvider>
      <ChatBubble />
    </XProvider>
  </React.StrictMode>
)
