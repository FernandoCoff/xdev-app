import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { loginUser } from '../../store/reducers/authSlice'
import { AuthContainer } from '../../style'
import { CardForm } from '../../components/cardForm'
import { InputForm } from '../../components/inputForm'
import { FormButton } from '../../components/formButton'
import * as S from './style'

type StatusType = 'success' | 'error' | 'empty'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState({ email: '', password: '' })
  const [statuses, setStatuses] = useState<{ [key: string]: StatusType }>({
    email: 'empty',
    password: 'empty',
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { status, isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email.length === 0) {
      setStatuses((prev) => ({ ...prev, email: 'empty' }))
      setErrors((prev) => ({ ...prev, email: '' }))
    } else if (!emailRegex.test(email)) {
      setStatuses((prev) => ({ ...prev, email: 'error' }))
      setErrors((prev) => ({ ...prev, email: 'Email inválido!' }))
    } else {
      setStatuses((prev) => ({ ...prev, email: 'success' }))
      setErrors((prev) => ({ ...prev, email: '' }))
    }
  }, [email])

  useEffect(() => {
    if (password.length === 0) {
      setStatuses((prev) => ({ ...prev, password: 'empty' }))
      setErrors((prev) => ({ ...prev, password: '' }))
    } else {
      setStatuses((prev) => ({ ...prev, password: 'success' }))
      setErrors((prev) => ({ ...prev, password: '' }))
    }
  }, [password])

  const validateForm = () => {
    if (statuses.email === 'success' && statuses.password === 'success') {
      return true
    }

    const newErrors = { email: '', password: '' }
    if (email.length === 0) newErrors.email = 'Este campo é obrigatório.'
    if (password.length === 0) newErrors.password = 'Este campo é obrigatório.'
    setErrors(newErrors)

    return false
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (validateForm()) {
      dispatch(loginUser({ email, password }))
    }
  }

  return (
    <AuthContainer>
      <CardForm>
        <S.Header>
          <h2>Login</h2>
          <p>
            Precisando de uma conta? <Link to="/register">Crie agora.</Link>
          </p>
        </S.Header>
        <form onSubmit={submitForm}>
          <InputForm
            name="email"
            label="Email"
            setContent={({ target }) => setEmail(target.value)}
            type="email"
            $status={statuses.email}
            error={errors.email}
            required
          />
          <InputForm
            name="password"
            label="Senha"
            setContent={({ target }) => setPassword(target.value)}
            type="password"
            $status={statuses.password}
            error={errors.password}
            required
          />
          <FormButton status={status} text="Login" />
        </form>
        {status === 'failed' && <S.error>Email e/ou senha incorretos!</S.error>}
      </CardForm>
    </AuthContainer>
  )
}

export default Login
