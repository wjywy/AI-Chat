import { useState } from 'react'

export function ConversationSidebar() {
  const [conversations, setConversations] = useState([
    { id: 1, title: '对话1' },
    { id: 2, title: '对话2' }
  ])

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4 ">会话列表</h2>
      <ul className="space-y-2">
        {conversations.map((conv) => (
          <li key={conv.id} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            {conv.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
