import { RobotOutlined, TagOutlined } from '@ant-design/icons'
import { Card, Row, Col, Tag, Button, Input } from 'antd'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useConversationStore } from '@pc/store'

import type { Agent } from '@pc/types/agent'

const { Search } = Input

// 模拟数据
const mockAgents: Agent[] = [
  {
    id: '1',
    name: '小红书文案生成器',
    description: '专业的小红书文案创作助手，帮你生成吸引人的种草文案，提升内容传播效果',
    avatar: '📝',
    category: '内容创作',
    tags: ['文案', '小红书', '营销'],
    prompt: '你是一个专业的小红书文案创作助手...',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    name: '诗词生成器',
    description: '古典诗词创作专家，能够创作各种风格的诗词作品，传承中华文化之美',
    avatar: '🎭',
    category: '文学创作',
    tags: ['诗词', '古典文学', '创作'],
    prompt: '你是一个古典诗词创作专家...',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

export default function Agents() {
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()
  const { setSelectedId } = useConversationStore()

  const filteredAgents = useMemo(() => {
    if (!searchText) return mockAgents
    return mockAgents.filter(
      (agent) =>
        agent.name.toLowerCase().includes(searchText.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchText.toLowerCase()) ||
        agent.tags.some((tag) => tag.toLowerCase().includes(searchText.toLowerCase()))
    )
  }, [searchText])

  const handleAgentClick = (agent: Agent) => {
    setSelectedId(agent.id)
    // 这里可以跳转到与该Agent的对话页面
    navigate(`/conversation?agent=${agent.id}`)
  }

  return (
    <div className="p-6 h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-3">
            <RobotOutlined className="text-blue-500" />
            Agent 助手
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">选择一个AI助手开始对话</p>
          <Search
            placeholder="搜索Agent..."
            allowClear
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md shadow-sm"
          />
        </div>

        <Row gutter={[24, 24]}>
          {filteredAgents.map((agent) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={agent.id}>
              <Card
                hoverable
                className="h-full cursor-pointer transition-all duration-1000 hover:shadow-xl hover:-translate-y-1 border-0 shadow-md bg-white dark:bg-gray-800"
                onClick={() => handleAgentClick(agent)}
                cover={
                  <div className="flex items-center justify-center h-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                    <span className="text-5xl">{agent.avatar}</span>
                  </div>
                }
                actions={[
                  <Button
                    key="chat"
                    type="primary"
                    size="middle"
                    className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 font-medium"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAgentClick(agent)
                    }}>
                    开始对话
                  </Button>
                ]}>
                <Card.Meta
                  title={
                    <div className="flex items-center justify-between mb-2">
                      <span className="truncate text-lg font-semibold text-gray-800 dark:text-white">
                        {agent.name}
                      </span>
                      <TagOutlined className="text-gray-400 text-sm" />
                    </div>
                  }
                  description={
                    <div className="space-y-3">
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed overflow-hidden">
                        <span className="line-clamp-2">{agent.description}</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {agent.tags.slice(0, 3).map((tag) => (
                          <Tag
                            key={tag}
                            style={{ background: 'none' }}
                            className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                            {tag}
                          </Tag>
                        ))}
                        {agent.tags.length > 3 && (
                          <Tag className="bg-none bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 px-2 py-0.5 rounded-full text-xs">
                            {agent.tags.length - 3}
                          </Tag>
                        )}
                      </div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        {filteredAgents.length === 0 && (
          <div className="text-center py-16">
            <RobotOutlined className="text-6xl text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">没有找到匹配的Agent</p>
          </div>
        )}
      </div>
    </div>
  )
}
