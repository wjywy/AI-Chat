import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Bubble, Sender } from '@ant-design/x'
import { useTranslation } from 'react-i18next'

import { useConversationStore } from '@pc/store'

type Conversation = {
  id: number
  title: string
}

const messages = [
  {
    content: 'Hello, Ant Design X!',
    role: 'user'
  }
]

export function ConversationDetail() {
  const { id } = useParams()
  const { conversations } = useConversationStore()
  const { t } = useTranslation()
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)

  useEffect(() => {
    const found = conversations.find((c) => c.id === Number(id))
    setCurrentConversation(found || null)
  }, [conversations, id])

  return (
    <div className="p-4">
      <div className="p-4 rounded-lg shadow">
        {currentConversation ? (
          <>
            <h1 className="text-xl font-bold dark:text-white">{currentConversation.title}</h1>
            <div className="mt-4">
              <Bubble.List items={messages} />
              <Sender placeholder={t('common.submit')} />
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">not found</div>
        )}
      </div>
    </div>
  )
}
