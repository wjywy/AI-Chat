import React from 'react'
import { createRoot } from 'react-dom/client'

/**
 * Chrome扩展内容脚本
 *
 * 注入到网页中运行，提供页面交互功能
 */

// 简单的浮动按钮组件
function FloatingBubble() {
  const handleClick = () => {
    // 通知background script打开弹窗
    chrome.runtime.sendMessage({ type: 'OPEN_POPUP' })
  }

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        backgroundColor: '#1677ff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 2147483647,
        color: 'white',
        fontSize: '24px'
      }}>
      💬
    </div>
  )
}

// 避免重复注入
if (!document.getElementById('ai-chat-root')) {
  // 创建容器并渲染
  const container = document.createElement('div')
  container.id = 'ai-chat-root'
  document.body.appendChild(container)

  const root = createRoot(container)
  root.render(<FloatingBubble />)
}

// 监听background script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Content script收到消息:', request.type)

  if (request.type === 'GET_PAGE_CONTENT') {
    // 获取页面基本信息
    const pageContent = {
      title: document.title,
      url: window.location.href,
      content: document.body.innerText.slice(0, 1000)
    }
    sendResponse({ pageContent })
  }
})
