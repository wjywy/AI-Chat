// 定义会话对象类型
export interface ChatSession {
  id: string // 注意：接口文档中id是string类型，而之前我们前端使用的是number，这里统一为string
  title: string
  isActive: boolean
  userId: number
  createTime: string
  updateTime: string
}

// 定义会话消息类型
export interface ChatMessage {
  id: string
  role: 'user' | 'system' // 根据实际情况调整role的可能值
  content: string
  chatId: string
  createdAt: string
  imgUrl: string[] | null
  fileContent:
    | {
        fileId: string
        fileName: string
      }[]
    | null
}
