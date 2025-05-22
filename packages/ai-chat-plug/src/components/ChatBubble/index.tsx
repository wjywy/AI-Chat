import { Bubble, Sender } from '@ant-design/x'
import { useState } from 'react'

const ChatBubble = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSend = (message: string) => {
    if (!message.trim()) return
    // TODO: 实现发送消息的逻辑
    console.log('发送消息:', message)
  }

  return (
    <div className="chat-bubble fixed bottom-5 right-5 w-96 h-[500px] bg-white rounded-lg shadow-lg flex flex-col">
      <div className="flex-1 overflow-auto p-4">
        <Bubble.List items={messages} />
      </div>
      <div className="p-4 border-t">
        <Sender
          onSubmit={handleSend}
          loading={loading}
          autoSize={{ minRows: 1, maxRows: 4 }}
        />
      </div>
    </div>
  )
}

export default ChatBubble
