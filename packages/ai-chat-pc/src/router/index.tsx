import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
  </Route>
)

const router = createBrowserRouter(routes)

export default router
