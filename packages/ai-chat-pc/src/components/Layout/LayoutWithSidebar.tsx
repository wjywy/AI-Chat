import { Outlet } from 'react-router-dom'
import { ConversationSidebar } from '../Conversation/ConversationSidebar'
import { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

export function LayoutWithSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen">
      <div
        className={`${collapsed ? 'w-10' : 'w-64'} border-r border-gray-200 transition-all duration-300`}>
        <div className="flex justify-between items-center p-2">
          {!collapsed && <img src="/gpt.jpg" alt="GPT Logo" className="w-8 h-8" />}
          {collapsed ? (
            <MenuUnfoldOutlined onClick={() => setCollapsed(false)} className="cursor-pointer" />
          ) : (
            <MenuFoldOutlined onClick={() => setCollapsed(true)} className="cursor-pointer" />
          )}
        </div>
        {!collapsed && <ConversationSidebar />}
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
