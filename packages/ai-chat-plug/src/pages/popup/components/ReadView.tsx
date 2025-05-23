import React from 'react'
import { ReadView as BaseReadView } from '../../../components'
import { useChatState } from '../hooks/useChatState'

/**
 * Popup页面的智读视图组件
 */
export function ReadView() {
  // 获取聊天相关状态
  const { messages, loading, sendMessage } = useChatState()

  // TODO: 将来在这里添加页面内容获取逻辑
  const pageContent = undefined // 暂时为空，等实现Chrome API后填充

  // TODO: 将来在这里添加页面分析逻辑
  function handleAnalyzePage() {
    console.log('页面分析功能待实现')
    // 将来这里会有真正的页面分析逻辑
  }

  return (
    <BaseReadView
      messages={messages}
      pageContent={pageContent}
      loading={loading}
      onSendMessage={sendMessage}
      onAnalyzePage={handleAnalyzePage}
    />
  )
}

export default ReadView
