import { Outlet } from 'react-router-dom'
import ChatList from '../ChatList'

const Home = () => {
  return (
    <div className="flex h-screen">
      <ChatList />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default Home
