import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import CreateAccount from '../pages/CreateAccount'
import { AnimatedLayout } from '../components/PageTransition/PageTransition'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/" element={<Home />} />
    <Route element={<AnimatedLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
    </Route>
  </Route>
)

const router = createBrowserRouter(routes)

export default router
