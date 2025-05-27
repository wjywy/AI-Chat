import { Outlet } from 'react-router-dom'
import { ConversationSidebar } from '../Conversation/ConversationSidebar'
import { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { UserAvatar } from '@pc/components/Author/UserAvatar'
import { SearchButton } from '../../components/Search'

export function LayoutWithSidebar() {
  
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen">
      <div
        className={`${collapsed ? 'w-10' : 'w-64'} border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="flex justify-between items-center p-2 border-b border-gray-200">
          {!collapsed && <img src="/gpt.jpg" alt="GPT Logo" className="w-8 h-8" />}
          <div className="flex items-center gap-2">
            {!collapsed && <UserAvatar />}
            {collapsed ? (
              <MenuUnfoldOutlined onClick={() => setCollapsed(false)} className="cursor-pointer" />
            ) : (
              <MenuFoldOutlined onClick={() => setCollapsed(true)} className="cursor-pointer" />
            )}
          </div>
        </div>
        {!collapsed && <ConversationSidebar />}
      </div>
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute top-0 right-0 z-50">
          <SearchButton />
        </div>
        <Outlet />
      </div>
    </div>
  )
}
