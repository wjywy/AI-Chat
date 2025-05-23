import { useParams } from 'react-router-dom'
import { Bubble, Sender } from '@ant-design/x'

interface Message {
  content: string
  role: 'user' | 'assistant'
}

const Chat = () => {
  const { chatId } = useParams()
  const messages: Message[] = [
    {
      content: 'Hello, Ant Design X!',
      role: 'user'
    },
    {
      content: '你好！我是AI助手，很高兴为你服务。',
      role: 'assistant'
    }
  ]

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        <Bubble.List items={messages} />
      </div>
      <div className="p-4 border-t border-gray-200">
        <Sender />
      </div>
    </div>
  )
}

export default Chat
