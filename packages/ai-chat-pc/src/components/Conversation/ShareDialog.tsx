import { CopyOutlined } from '@ant-design/icons'
import { message, Modal, Button } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { sessionApi } from '@pc/apis/session'

interface ShareDialogProps {
  chatId: string | null
  onClose: () => void
}

export function ShareDialog({ chatId, onClose }: ShareDialogProps) {
  const [shareLink, setShareLink] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // 当chatId变化时获取分享链接
  useEffect(() => {
    if (chatId) {
      handleShare()
    } else {
      setShareLink('')
    }
  }, [chatId])

  const handleShare = async () => {
    if (!chatId) return
    try {
      setLoading(true)
      const { data } = await sessionApi.shareChat(chatId)
      const shareLink = `${window.location.origin}/shared/${data.shareId}`
      setShareLink(shareLink)
    } catch (error) {
      console.error(error)
      message.error('生成分享链接失败')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        message.success('链接已复制到剪贴板')
      })
      .catch(() => {
        message.error('复制失败，请手动复制')
      })
  }

  return (
    <Modal
      title="分享链接"
      open={!!chatId}
      onCancel={onClose}
      footer={[
        <Button
          key="copy"
          type="primary"
          icon={<CopyOutlined />}
          onClick={handleCopy}
          disabled={!shareLink || loading}>
          复制链接
        </Button>,
        <Button key="close" onClick={onClose}>
          关闭
        </Button>,
        <Button
          key="preview"
          onClick={() => navigate(shareLink.replace(window.location.origin, ''))}
          disabled={!shareLink || loading}>
          对话预览
        </Button>
      ]}>
      <p>通过以下链接分享此会话：</p>
      <div className="p-2 bg-gray-100 rounded break-all">
        {loading ? '获取分享链接中...' : shareLink || '暂无分享链接'}
      </div>
    </Modal>
  )
}
