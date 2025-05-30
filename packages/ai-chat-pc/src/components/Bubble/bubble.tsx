import { useRef } from 'react'
import { Bubble } from '@ant-design/x'
import type { GetProp, GetRef } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { useChatStore, useConversationStore } from '@pc/store'

import './bubble.css' // 添加CSS导入

export const ChatBubble = () => {
  const listRef = useRef<GetRef<typeof Bubble.List>>(null)
  const { messages } = useChatStore()
  const { selectedId } = useConversationStore()

  const rolesAsObject: GetProp<typeof Bubble.List, 'roles'> = {
    ai: {
      placement: 'start',
      avatar: { icon: <UserOutlined />, style: { background: '#fde3cf' } },
      //   typing: { step: 5, interval: 20 },
      style: {
        maxWidth: 600
      }
    },
    user: {
      placement: 'end',
      avatar: { icon: <UserOutlined />, style: { background: '#87d068' } }
    }
  }

  const chatMessage = selectedId ? messages.get(selectedId) : []

  return (
    <Bubble.List
      ref={listRef}
      className="chat-bubble-list"
      style={{
        paddingInline: 16,
        height: '100%',
        width: '50vw',
        overflowY: 'auto', // 确保可以滚动但滚动条被CSS隐藏
        paddingBottom: '20%'
      }}
      roles={rolesAsObject}
      items={chatMessage?.map((message, index) => {
        const { content } = message
        const isAI = message.role === 'system'

        return { key: index, role: isAI ? 'ai' : 'user', content }
      })}
    />
  )
}
