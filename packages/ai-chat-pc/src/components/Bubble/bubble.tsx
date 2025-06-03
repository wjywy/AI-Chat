import { useRef } from 'react'
import { Bubble } from '@ant-design/x'
import type { GetProp, GetRef } from 'antd'
import { Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { useChatStore, useConversationStore } from '@pc/store'

import './bubble.css' // 添加CSS导入
import type { MessageContent } from '@pc/types/chat'
import { useThemeStore } from '@pc/store'
export const ChatBubble = () => {
  const listRef = useRef<GetRef<typeof Bubble.List>>(null)
  const { messages } = useChatStore()
  const { selectedId } = useConversationStore()
  const { theme } = useThemeStore()

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

  // 渲染消息内容
  const renderMessageContent = (content: string | MessageContent[]) => {
    // 如果是字符串，直接返回
    if (typeof content === 'string') {
      return content
    }

    // 如果是数组，渲染混合内容
    return (
      <div className="message-content">
        {content
          .filter((item) => item.type === 'image')
          .map((item, index) => (
            <div key={`image-${index}`} className="message-image-container">
              <Image
                src={item.content}
                alt="聊天图片"
                style={{ maxWidth: '300px', borderRadius: '8px' }}
                preview={{
                  mask: <div style={{ color: theme === 'dark' ? '#fff' : '#000' }}>预览</div>,
                  rootClassName: theme === 'dark' ? 'dark-image-preview' : ''
                }}
              />
            </div>
          ))}

        {content
          .filter((item) => item.type === 'text')
          .map((item, index) => (
            <div key={`text-${index}`} className="text-content">
              {item.content}
            </div>
          ))}
      </div>
    )
  }

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
      items={chatMessage?.map((message, index) => ({
        key: index,
        role: message.role === 'system' ? 'ai' : 'user',
        content: renderMessageContent(message.content)
      }))}
    />
  )
}
