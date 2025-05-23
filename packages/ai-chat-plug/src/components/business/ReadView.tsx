import React from 'react'
import { Bubble } from '@ant-design/x'
import { Message, PageContent } from '../../types'
import { ChatInput } from '../ui/ChatInput'

// 定义组件参数类型
type ReadViewProps = {
  messages: Message[]
  pageContent?: PageContent
  loading?: boolean
  onSendMessage: (content: string) => void
  onAnalyzePage?: () => void
}

// 页面信息展示组件
function PageInfoSection({ pageContent }: { pageContent: PageContent }) {
  // 提取计算逻辑到变量，提高可读性
  const contentLength = pageContent.content?.length || 0
  const imageCount = pageContent.images?.length || 0
  const hasImages = imageCount > 0

  return (
    <div className="p-4 border-b bg-blue-50">
      <div className="bg-white rounded-lg border border-blue-200 p-3">
        {/* 标题栏 */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-600">📄</span>
          <span className="text-sm font-medium">正在智读</span>
        </div>

        {/* 页面信息 */}
        <div className="text-sm">
          <div className="font-medium text-gray-800 mb-1">{pageContent.title}</div>
          <div className="text-gray-500 text-xs">{pageContent.url}</div>
          <div className="text-gray-600 text-xs mt-2">
            内容长度: {contentLength} 字符
            {hasImages && <span className="ml-2">| 图片: {imageCount} 张</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

// 空状态展示组件 (提取出来提高易读性)
function EmptyState({
  hasPageContent,
  onAnalyzePage
}: {
  hasPageContent: boolean
  onAnalyzePage?: () => void
}) {
  // 判断是否显示分析按钮
  const showAnalyzeButton = hasPageContent && onAnalyzePage

  return (
    <div className="text-center text-gray-400 mt-8">
      <div className="text-4xl mb-2">🤖</div>
      <div className="text-sm">智读模式已准备就绪</div>
      <div className="text-xs text-gray-300 mt-2">我可以帮你分析当前页面内容，或回答相关问题</div>

      {showAnalyzeButton && (
        <button
          onClick={onAnalyzePage}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors">
          开始分析页面
        </button>
      )}
    </div>
  )
}

/**
 * 智读视图组件
 *
 * 功能：显示网页内容分析界面
 * 包含：页面信息 + 消息列表 + 输入框
 */
export function ReadView(props: ReadViewProps) {
  const { messages, pageContent, loading = false, onSendMessage, onAnalyzePage } = props

  // 提取状态判断到变量，提高可读性
  const hasPageContent = pageContent !== undefined && pageContent !== null
  const hasMessages = messages.length > 0

  return (
    <div className="flex flex-col h-full">
      {/* 页面信息区域 */}
      {hasPageContent && <PageInfoSection pageContent={pageContent} />}

      {/* 消息区域 */}
      <div className="flex-1 overflow-auto p-4">
        {hasMessages ? (
          <Bubble.List items={messages} />
        ) : (
          <EmptyState hasPageContent={hasPageContent} onAnalyzePage={onAnalyzePage} />
        )}
      </div>

      {/* 输入区域 */}
      <ChatInput
        placeholder="针对此页面提问..."
        loading={loading}
        onSubmit={onSendMessage}
        className="bg-blue-50"
      />
    </div>
  )
}
