import React from 'react'

/**
 * 智读模式提示组件
 */
export function ReadModeHint() {
  return (
    <div className="mx-4 mt-4 mb-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
      <div className="flex items-start gap-2">
        {/* 左侧：提示图标 */}
        <div className="text-blue-500 mt-0.5">💡</div>

        {/* 中间：提示内容 */}
        <div className="flex-1">
          {/* 主标题 */}
          <div className="text-sm font-medium text-blue-800 mb-1">智读模式已启用</div>

          {/* 操作指导 */}
          <div className="text-xs text-blue-600 leading-relaxed">
            选择网页中的任意文本内容，AI 将帮助您深度理解和分析
          </div>
        </div>

        {/* 右侧：装饰图标 */}
        <div className="text-blue-400 opacity-60">📖</div>
      </div>
    </div>
  )
}
