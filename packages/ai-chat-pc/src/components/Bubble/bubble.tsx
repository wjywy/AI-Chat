import { UserOutlined } from '@ant-design/icons'
import { Bubble } from '@ant-design/x'
import { Modal, type GetProp, type GetRef } from 'antd'
import { useRef, useState } from 'react'

import { useChatStore, useConversationStore } from '@pc/store'

import { FileCom, ImgCom, TextCom } from './content'

import type { MessageContent } from '@pc/types/chat'
import './bubble.css' // 添加CSS导入

export const ChatBubble = () => {
  const listRef = useRef<GetRef<typeof Bubble.List>>(null)
  const { messages } = useChatStore()
  const { selectedId } = useConversationStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [prePath, setPrePath] = useState('')
  const rolesAsObject: GetProp<typeof Bubble.List, 'roles'> = {
    system: {
      placement: 'start',
      avatar: { icon: <UserOutlined />, style: { background: '#fde3cf' } },
      style: {
        maxWidth: 600
      }
    },
    user: {
      placement: 'end',
      avatar: { icon: <UserOutlined />, style: { background: '#87d068' } }
    },
    file: {
      placement: 'end',
      variant: 'borderless'
    },
    image: {
      placement: 'end',
      variant: 'borderless'
    }
  }

  const chatMessage = selectedId ? messages.get(selectedId) : []

  // 渲染消息内容
  const renderMessageContent = (content: MessageContent[]) => {
    if (!content || content.length === 0) {
      return null
    }

    // 对话消息列表中一般不存在删除消息的情况，所以此处暂时使用index作为key
    return content.map((item, index) => {
      switch (item.type) {
        case 'text':
          return <TextCom key={index} data={item} />
        case 'image':
          return <ImgCom key={index} data={item} />
        case 'file':
          return (
            <FileCom
              key={index}
              data={item}
              setIsModalOpen={setIsModalOpen}
              setPrePath={setPrePath}
            />
          )
        default:
          return null
      }
    })
  }

  return (
    <>
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
          role: message.role,
          content: renderMessageContent(message.content)
        }))}
      />

      {/* PDF预览组件，全局单一实例 */}
      <Modal
        title="文件预览"
        width="60%"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}>
        {prePath && (
          <iframe
            src={prePath}
            style={{
              width: '100%',
              height: '70vh',
              border: 'none'
            }}
            title="PDF预览">
            <p>
              您的浏览器不支持 iframe，请<a href={prePath}>下载文件</a>查看。
            </p>
          </iframe>
        )}
      </Modal>
    </>
  )
}
