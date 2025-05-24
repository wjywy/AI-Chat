import { Outlet } from 'react-router-dom'
import { ConversationSidebar } from '../Conversation/ConversationSidebar'

export function LayoutWithSidebar() {
  return (
    <div className="flex h-screen">
      <div className="w-64 border-r border-gray-200">
        <ConversationSidebar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
