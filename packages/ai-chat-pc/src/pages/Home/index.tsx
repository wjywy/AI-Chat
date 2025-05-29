import { ChatBubble } from '@pc/components/Bubble/bubble'
import AIRichInput from '@pc/components/AIRichInput'

const Home = () => {
  return (
    <div className="p-4 h-screen relative flex flex-col items-center overflow-hidden">
      <ChatBubble></ChatBubble>
      <AIRichInput />
    </div>
  )
}

export default Home
