import { MoreOutlined, MessageOutlined, SearchOutlined, RobotOutlined } from '@ant-design/icons'
import { Dropdown, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { sessionApi } from '@pc/apis/session'
import { SearchButton } from '@pc/components/Search/SearchButton'
import { useChatStore } from '@pc/store'

import { isImageByExtension } from '../../utils/judgeImage'

import { useConversationActions } from './hooks/useConversationActions'
import { ShareDialog } from './ShareDialog'

export function ConversationSidebar() {
  const [shareDialogChatId, setShareDialogChatId] = useState<string | null>(null)

  const handleShare = (id: string) => {
    setShareDialogChatId(id)
  }
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick: (e: any) => {
        e.domEvent.stopPropagation()
        startEdit(id, title)
      }
    },
    {
      key: 'share',
      label: '分享',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick: (e: any) => {
        e.domEvent.stopPropagation()
        handleShare(id)
      }
    },
    {
      key: 'delete',
      label: '删除',
      danger: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // 对图片做处理，现在讲图片归类为文件了，测试之后待删
      if (message.imgUrl) {
        message.imgUrl.forEach((url) => {
          addMessage({
            content: [
              {
                type: 'image',
                content: url
              }
            ],
            role: 'image'
          })
        })
      }

      // 对文件做处理
      if (message.fileContent) {
        message.fileContent.forEach((file) => {
          if (isImageByExtension(file.fileName)) {
            addMessage({
              content: [
                {
                  type: 'image',
                  content: file.fileName
                }
              ],
              role: 'image'
            })
          } else {
            addMessage({
              content: [
                {
                  type: 'file',
                  content: {
                    uid: file.fileId,
                    name: file.fileName
                  }
                }
              ],
              role: 'file'
            })
          }
        })
      }

      addMessage({
        content: [
          {
            type: 'text',
            content: message.content
          }
        ],
        role: message.role
      })
    })
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col gap-2">
        <button
          className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors w-full"
          onClick={() => handleAddConversation()}>
          <MessageOutlined />
          <span>新对话</span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors w-full"
          onClick={() => navigate('/agents')}>
          <RobotOutlined />
          <span>Agent</span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors w-full"
          onClick={() => setIsSearchOpen(true)}>
          <SearchOutlined />
          <span>搜索记录</span>
        </button>
        <SearchButton isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
      <ul className="space-y-2 overflow-hidden text-ellipsis">
        {conversations.map((conv) => (
          <li
            key={conv.id}
            className={`p-2 hover:bg-gray-100 rounded cursor-pointer flex justify-between items-center ${
              selectedId === conv.id ? 'bg-gray-200' : ''
            }`}
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
              <div className="truncate text-gray-700">{conv.title}</div>
            )}
            <Dropdown menu={{ items: items(conv.id, conv.title) }} trigger={['click']}>
              <MoreOutlined
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={(e) => e.stopPropagation()}
              />
            </Dropdown>
          </li>
        ))}
      </ul>
      <ShareDialog chatId={shareDialogChatId} onClose={() => setShareDialogChatId(null)} />
    </div>
  )
}
