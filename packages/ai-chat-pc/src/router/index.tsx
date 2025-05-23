import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Chat from '../pages/Chat'
import Welcome from '../pages/Welcome'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/" element={<Home />}>
      <Route index element={<Welcome />} />
      <Route path="chat/:chatId" element={<Chat />} />
    </Route>
    <Route path="/login" element={<Login />} />
  </Route>
)

const router = createBrowserRouter(routes)

export default router
