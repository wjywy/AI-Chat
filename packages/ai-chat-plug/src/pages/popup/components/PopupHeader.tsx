import React from 'react'
import { CHAT_MODES } from '../../../types'
import { ModeButtons } from './ModeButtons'

// 定义组件接收的参数类型
type PopupHeaderProps = {
  mode: string // 当前聊天模式
  onModeChange: (mode: string) => void // 切换模式的回调函数
  onClear: () => void // 清空消息的回调函数
}

/**
 * 弹窗头部组件 页面级组件
 */
export function PopupHeader(props: PopupHeaderProps) {
  const { mode, onModeChange, onClear } = props

  // 根据模式显示不同的标题
  function getTitle() {
    if (mode === CHAT_MODES.CHAT) {
      return '💬 对话'
    } else {
      return '📖 智读'
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      {/* 左侧：标题区域 */}
      <div className="text-lg font-medium text-gray-800">{getTitle()}</div>

      {/* 右侧：操作区域 */}
      <div className="flex items-center gap-2">
        {/* 模式切换按钮组 (使用子组件) */}
        <ModeButtons mode={mode} onModeChange={onModeChange} />

        {/* 清空按钮 */}
        <button
          onClick={onClear}
          className="px-2 py-1 text-xs text-gray-500 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
          title="清空聊天记录">
          🗑️ 清空
        </button>
      </div>
    </div>
  )
}
