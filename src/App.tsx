import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import NotFound from './pages/notFound'
import Login from './pages/login'
import Register from './pages/register'
import ProtectedRoute from './pages/protected'
import { Feed } from './components/feed'
import { Profile } from './components/profile'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />}>
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route index element={<Feed />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
