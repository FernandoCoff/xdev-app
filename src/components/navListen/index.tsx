import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { resetStatus } from '../../store/reducers/authSlice'

const NavigationListener = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(resetStatus())
  }, [location, dispatch])

  return null
}

export default NavigationListener
