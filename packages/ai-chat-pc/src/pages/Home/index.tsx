import { Bubble, Sender } from '@ant-design/x'
import useBearStore from '@pc/store/useBearStore'

const messages = [
  {
    content: 'Hello, Ant Design X!',
    role: 'user'
  }
]

const Home = () => {
  const bears = useBearStore((state) => state.bears)

  return (
    <>
      <p className="font-bold">this is Home - {bears}</p>
      <div>
        <Bubble.List items={messages} />
        <Sender />
      </div>
    </>
  )
}

export default Home
