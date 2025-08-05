import { Attachments } from '@ant-design/x'
import { Image } from 'antd'
import markdownit from 'markdown-it'
import hljs from 'markdown-it-highlightjs'

import type { FileContent, ImageContent, TextContent, MessageContent } from '@pc/types/chat'
import type { ReactElement } from 'react'

// 定义内容处理器的类型映射
type ContentHandlers = {
  [K in MessageContent['type']]: (data: Extract<MessageContent, { type: K }>) => ReactElement
}

const imageContent = (data: ImageContent): ReactElement => {
  const { content } = data
  console.log(content, 'content')
  return <Image src={content}></Image>
}

const fileContent = (data: FileContent): ReactElement => {
  const { content } = data
  return <Attachments.FileCard item={content} />
}

const textContent = (data: TextContent): ReactElement => {
  const { content } = data
  // 使用 markdown-it 渲染文本内容
  const md = markdownit({
    html: true,
    breaks: true
  }).use(hljs)

  const html = md.render(content)

  // 处理代码块，添加语言标签
  const processedHtml = html
    .replace(
      /<pre><code class="language-(\w+)">/g,
      '<pre data-lang="$1"><code class="language-$1">'
    )
    .replace(/<pre><code>/g, '<pre data-lang="text"><code>')

  return <div className="markdown-content" dangerouslySetInnerHTML={{ __html: processedHtml }} />
}

export const allMessageContent: ContentHandlers = {
  image: imageContent,
  file: fileContent,
  text: textContent
}
