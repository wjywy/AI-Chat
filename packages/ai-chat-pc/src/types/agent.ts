export interface Agent {
  id: string
  name: string
  description: string
  avatar?: string
  category: string
  tags: string[]
  prompt: string
  createdAt: string
  updatedAt: string
}

export interface AgentCategory {
  id: string
  name: string
  description?: string
}
