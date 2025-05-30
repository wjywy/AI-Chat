import { Button, Dropdown, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { MoreOutlined, MessageOutlined } from '@ant-design/icons'

import { useConversationActions } from './hooks/useConversationActions'
import { useEffect, useRef } from 'react'
import { sessionApi } from '@pc/apis/session'
import { type MessageProps, useChatStore } from '@pc/store'

export function ConversationSidebar() {
  const navigate = useNavigate()
  const {
    selectedId,
    setSelectedId,
    conversations,
    editingId,
    editValue,
    setEditValue,
    handleAddConversation,
    handleDelete,
    startEdit,
    handleEdit,
    fetchConversations
  } = useConversationActions()

  const { addMessage, messages } = useChatStore()

  // 初始化时获取会话列表
  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])

  const items = (id: string, title: string) => [
    {
      key: 'rename',
      label: '重命名',
      onClick: (e: any) => {
        e.domEvent.stopPropagation()
        startEdit(id, title)
      }
    },
    {
      key: 'delete',
      label: '删除',
      danger: true,
      onClick: (e: any) => {
        e.domEvent.stopPropagation()
        handleDelete(id)
        if (id === selectedId) {
          navigate('/')
        }
      }
    }
  ]

  const handleConversationClick = async (id: string) => {
    // 点击会话时将id添加到url中
    setSelectedId(id)
    navigate(`/conversation/${id}`)

    if (messages.get(id) !== undefined) {
      return
    }

    // 获取该会话的所有历史消息
    const { data } = await sessionApi.getChatHistory(id)

    data.forEach((message) => {
      const ans: MessageProps = {
        content: message.content,
        role: message.role
      }
      addMessage(ans)
    })
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <Button type="primary" icon={<MessageOutlined />} onClick={() => handleAddConversation()}>
          开启新对话
        </Button>
      </div>
      <ul className="space-y-2 overflow-hidden text-ellipsis">
        {conversations.map((conv) => (
          <li
            key={conv.id}
            className={`p-2 hover:bg-gray-100 rounded cursor-pointer flex justify-between items-center ${selectedId === conv.id ? 'bg-blue-50' : ''}`}
            onClick={() => handleConversationClick(conv.id)}>
            {editingId === conv.id ? (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onPressEnter={() => handleEdit(conv.id)}
                onBlur={() => handleEdit(conv.id)}
                autoFocus
              />
            ) : (
              <div className="truncate">{conv.title}</div>
            )}
            <Dropdown menu={{ items: items(conv.id, conv.title) }} trigger={['click']}>
              <MoreOutlined className="ml-2" onClick={(e) => e.stopPropagation()} />
            </Dropdown>
          </li>
        ))}
      </ul>
    </div>
  )
}
