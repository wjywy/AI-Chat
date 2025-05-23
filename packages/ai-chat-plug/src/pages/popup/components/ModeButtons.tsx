import React from 'react'
import { CHAT_MODES } from '../../../types'

// 定义组件接收的参数类型
type ModeButtonsProps = {
  mode: string // 当前聊天模式
  onModeChange: (mode: string) => void // 切换模式的回调函数
}

/**
 * 模式切换按钮组件
 *
 * 这是一个专门的按钮组组件
 * 功能：提供对话/智读两种模式的切换
 */
export function ModeButtons(props: ModeButtonsProps) {
  const { mode, onModeChange } = props

  // 获取按钮的样式类名（根据是否为当前模式）
  function getButtonClass(currentMode: string) {
    // 基础样式
    const baseClass = 'px-3 py-1 rounded text-sm font-medium transition-all duration-200'

    // 选中状态样式
    const activeClass = 'bg-blue-500 text-white shadow-md transform scale-105'

    // 未选中状态样式
    const inactiveClass = 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'

    // 判断是否为当前模式
    const isActive = mode === currentMode

    return `${baseClass} ${isActive ? activeClass : inactiveClass}`
  }

  return (
    <div className="flex gap-2">
      {/* 对话模式按钮 */}
      <button
        className={getButtonClass(CHAT_MODES.CHAT)}
        onClick={() => onModeChange(CHAT_MODES.CHAT)}
        title="切换到对话模式">
        💬 对话
      </button>

      {/* 智读模式按钮 */}
      <button
        className={getButtonClass(CHAT_MODES.READ)}
        onClick={() => onModeChange(CHAT_MODES.READ)}
        title="切换到智读模式">
        📖 智读
      </button>
    </div>
  )
}
