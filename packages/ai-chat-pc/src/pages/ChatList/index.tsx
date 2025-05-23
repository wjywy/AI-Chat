import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ChatItem {
  id: string
  title: string
  lastMessage: string
  timestamp: string
}

const ChatList = () => {
  const navigate = useNavigate()
  const [chats, setChats] = useState<ChatItem[]>([
    {
      id: '1',
      title: '新对话',
      lastMessage: 'Hello, Ant Design X!',
      timestamp: '2025-05-23'
    }
  ])

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`)
  }

  const handleNewChat = () => {
    const newChat: ChatItem = {
      id: Date.now().toString(),
      title: '新对话',
      lastMessage: '',
      timestamp: new Date().toLocaleDateString()
    }
    setChats([newChat, ...chats])
    handleChatClick(newChat.id)
  }

  return (
    <div className="w-64 h-screen bg-gray-100 border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <button
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleNewChat}>
          新建对话
        </button>
      </div>
      <div className="space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="p-4 hover:bg-gray-200 cursor-pointer"
            onClick={() => handleChatClick(chat.id)}>
            <div className="font-medium">{chat.title}</div>
            <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
            <div className="text-xs text-gray-400">{chat.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatList
