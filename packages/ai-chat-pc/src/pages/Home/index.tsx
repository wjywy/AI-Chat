import { ChatBubble } from '@pc/components/Bubble/bubble'
import AIRichInput from '@pc/components/AIRichInput'

import './index.css' // 添加CSS导入

const Home = () => {
  return (
    <div className="p-4 h-screen relative flex flex-col items-center overflow-hidden">
      <ChatBubble></ChatBubble>
      <div className="fixed bottom-0 w-1/2 z-50 chat-input" style={{ margin: '0 auto' }}>
        <AIRichInput />
      </div>
    </div>
  )
}

export default Home
