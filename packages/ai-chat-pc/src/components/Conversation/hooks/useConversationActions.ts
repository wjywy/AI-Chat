import { useState } from 'react'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import useConversationStore from '../../../store/useConversationStore'

export function useConversationActions() {
  const navigate = useNavigate()
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')

  const { selectedId, conversations, setSelectedId, deleteConversation, updateConversation } =
    useConversationStore()

  const handleAddConversation = () => {
    setSelectedId(null)
    navigate('/')
  }

  const handleDelete = (id: number) => {
    deleteConversation(id)
    if (selectedId === id) {
      navigate('/')
    }
    message.success('会话删除成功')
  }

  const startEdit = (id: number, title: string) => {
    setEditingId(id)
    setEditValue(title)
  }

  const handleEdit = (id: number) => {
    updateConversation(id, { title: editValue })
    setEditingId(null)
    message.success('会话重命名成功')
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
    handleEdit
  }
}
