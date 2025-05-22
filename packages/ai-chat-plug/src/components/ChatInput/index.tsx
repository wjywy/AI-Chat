import React from 'react'
import { Sender } from '@ant-design/x'
import { MODEL_OPTIONS } from '../../types/chat'


const ChatInput = (props: {
  onSend: (text: string) => void
  onModelChange: (model: string) => void
  selectedModel: string
  loading?: boolean
}) => {
  const { onSend, loading = false } = props

  return (
    <div className="chat-input-container">
      <div className="flex items-center gap-2 p-2 border-t border-gray-100">
        <Sender
          onSubmit={onSend}
          loading={loading}
          autoSize={{ minRows: 1, maxRows: 4 }}
        />
      </div>
    </div>
  )
}

export default ChatInput
