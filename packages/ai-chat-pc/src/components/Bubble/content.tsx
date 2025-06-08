import { Image } from 'antd'
import type { ReactElement } from 'react'
import { Attachments } from '@ant-design/x'

import type { FileContent, ImageContent, TextContent, MessageContent } from '@pc/types/chat'

// 定义内容处理器的类型映射
type ContentHandlers = {
  [K in MessageContent['type']]: (data: Extract<MessageContent, { type: K }>) => ReactElement
}

const imageContent = (data: ImageContent): ReactElement => {
  const { content } = data
  return <Image src={content}></Image>
}

const fileContent = (data: FileContent): ReactElement => {
  const { content } = data
  return <Attachments.FileCard item={content} />
}

const textContent = (data: TextContent): ReactElement => {
  const { content } = data
  return <div>{content}</div>
}

export const allMessageContent: ContentHandlers = {
  image: imageContent,
  file: fileContent,
  text: textContent
}
