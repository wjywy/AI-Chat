import React from 'react'
import { CHAT_MODES } from '../../types'
import { useChatState } from './hooks/useChatState'
import { PopupHeader, ChatView, ReadView } from './components'

/**
 * Popup主容器组件
 */
export function PopupContainer() {
  // 从状态管理Hook获取数据和方法
  const { mode, setMode, clearMessages } = useChatState()

  // 根据当前模式决定显示哪个视图组件
  function renderContent() {
    // 聊天模式：显示ChatView组件
    if (mode === CHAT_MODES.CHAT) {
      return <ChatView />
    }

    // 智读模式：显示ReadView组件
    if (mode === CHAT_MODES.READ) {
      return <ReadView />
    }

    // 默认情况：显示ChatView（容错处理）
    return <ChatView />
  }

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* 固定头部区域 */}
      <PopupHeader mode={mode} onModeChange={setMode} onClear={clearMessages} />

      {/* 动态内容区域 */}
      <div className="flex-1 overflow-hidden">{renderContent()}</div>
    </div>
  )
}

export default PopupContainer
