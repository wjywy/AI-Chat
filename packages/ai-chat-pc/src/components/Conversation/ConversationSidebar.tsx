import { Button, Dropdown, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { MoreOutlined, MessageOutlined } from '@ant-design/icons'

import { useConversationActions } from './hooks/useConversationActions'
import { useEffect } from 'react'

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

  const handleConversationClick = (id: string) => {
    setSelectedId(id)
    navigate(`/conversation/${id}`)
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <Button type="primary" icon={<MessageOutlined />} onClick={() => handleAddConversation()}>
          开启新对话
        </Button>
      </div>
      <ul className="space-y-2">
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
              <span>{conv.title}</span>
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
