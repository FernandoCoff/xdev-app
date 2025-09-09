import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/home'
import NotFound from './pages/notFound'
import Login from './pages/login'
import Register from './pages/register'
import ProtectedRoute from './pages/protected'
import { Feed } from './components/feed'
import { Profile } from './components/profile'
import { useAppDispatch, useAppSelector } from './hooks'
import { fetchMyProfile } from './store/reducers/authSlice'
import { PostDetail } from './components/postDetail'
import { SearchProfile } from './components/searchProfile'
import { Followes } from './components/followes'
import { Following } from './components/following'

function App() {
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.auth.token)

  useEffect(() => {
    if (token) {
      dispatch(fetchMyProfile())
    }
  }, [dispatch, token])

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
            <Route path="profiles" element={<SearchProfile />} />
            <Route path="post/:id" element={<PostDetail />} />
            <Route path="followes" element={<Followes />} />
            <Route path="following" element={<Following />} />
            <Route index element={<Feed />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
