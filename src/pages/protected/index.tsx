import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../hooks'

function ProtectedRoute() {
  const { isAuthenticated, status } = useAppSelector((state) => state.auth)

  if (status === 'loading') {
    return <div>Carregando...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
