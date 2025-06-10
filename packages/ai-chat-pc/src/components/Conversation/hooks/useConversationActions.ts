import { message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useConversationStore } from '@pc/store'

export function useConversationActions() {
  const navigate = useNavigate()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const {
    selectedId,
    conversations,
    setSelectedId,
    deleteConversation,
    updateConversation,
    error,
    fetchConversations
  } = useConversationStore()

  const handleAddConversation = async () => {
    setSelectedId(null)
    navigate(`/conversation`)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteConversation(id)
      if (selectedId === id) {
        navigate('/')
      }
      message.success('会话删除成功')
    } catch {
      message.error(error || '删除会话失败')
    }
  }

  const startEdit = (id: string, title: string) => {
    setEditingId(id)
    setEditValue(title)
  }

  const handleEdit = async (id: string) => {
    try {
      await updateConversation(id, { title: editValue })
      setEditingId(null)
      message.success('会话重命名成功')
    } catch {
      message.error(error || '更新会话失败')
    }
  }

  return {
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
  }
}
