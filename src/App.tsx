import { Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import NotFound from './pages/notFound'
import Login from './pages/login'
import Register from './pages/register'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
