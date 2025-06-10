import AIRichInput from '@pc/components/AIRichInput'
import { ChatBubble } from '@pc/components/Bubble/bubble'

const Home = () => {
  return (
    <div className="p-4 h-screen relative flex flex-col items-center overflow-hidden">
      <ChatBubble></ChatBubble>
      <AIRichInput />
    </div>
  )
}

export default Home
