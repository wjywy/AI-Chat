import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { UserAvatar } from '@pc/components/Author/UserAvatar'
import { ConversationSidebar } from '@pc/components/Conversation/ConversationSidebar'

export function LayoutWithSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-white">
      <div
        className={`${
          collapsed ? 'w-10' : 'w-64'
        } bg-gray-50 border-r border-gray-200 transition-all duration-300 flex flex-col overflow-y-scroll`}>
        <div className="flex justify-between items-center p-2 border-b border-gray-200 bg-gray-50">
          {!collapsed && <img src="/gpt.jpg" alt="GPT Logo" className="w-8 h-8" />}
          <div className="flex items-center">
            {collapsed ? (
              <MenuUnfoldOutlined
                onClick={() => setCollapsed(false)}
                className="cursor-pointer text-gray-600 hover:text-gray-800"
              />
            ) : (
              <MenuFoldOutlined
                onClick={() => setCollapsed(true)}
                className="cursor-pointer text-gray-600 hover:text-gray-800"
              />
            )}
          </div>
        </div>
        {!collapsed && <ConversationSidebar />}
      </div>
      <div className="flex-1 relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 p-4 z-10">
          <UserAvatar />
        </div>
        <Outlet />
      </div>
    </div>
  )
}
