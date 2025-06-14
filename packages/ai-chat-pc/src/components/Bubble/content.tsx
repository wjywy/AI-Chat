import { Attachments } from '@ant-design/x'
import { Image, message } from 'antd'

import type { FileContent, ImageContent, TextContent } from '@pc/types/chat'
import type { ReactElement } from 'react'

// 定义内容处理器的类型映射
// type ContentHandlers = {
//   [K in MessageContent['type']]: (data: Extract<MessageContent, { type: K }>) => ReactElement
// }

export const ImgCom = ({ data }: { data: ImageContent }): ReactElement => {
  const { content } = data
  console.log(content, 'content')
  return <Image src={content}></Image>
}

export const FileCom = ({
  data,
  setIsModalOpen,
  setPrePath
}: {
  data: FileContent
  setIsModalOpen: (val: boolean) => void
  setPrePath: (path: string) => void
}) => {
  const { content } = data

  const handlePreview = () => {
    setIsModalOpen(true)
    if (content.path.split('.')[1] !== 'pdf') return message.warning('仅支持pdf文件预览')
    setPrePath(content.path)
  }

  return (
    <div className="cursor-pointer" onClick={handlePreview}>
      <Attachments.FileCard item={content} />
    </div>
  )
}

export const TextCom = ({ data }: { data: TextContent }): ReactElement => {
  const { content } = data
  return <div>{content}</div>
}
