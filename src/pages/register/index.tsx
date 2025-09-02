import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { registerUser } from '../../store/reducers/authSlice'
import { AuthContainer } from '../../style'
import { CardForm } from '../../components/cardForm'
import { InputForm } from '../../components/inputForm'
import { FormButton } from '../../components/formButton'
import * as S from './style'

type StatusType = 'success' | 'error' | 'empty'

function Register() {
  const {
    status: authStatus,
    error: authError,
    isAuthenticated,
  } = useAppSelector((state) => state.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUserName] = useState('')
  const [password2, setPassword2] = useState('')

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  })

  const [statuses, setStatuses] = useState<{ [key: string]: StatusType }>({
    username: 'empty',
    email: 'empty',
    password: 'empty',
    password2: 'empty',
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
    if (authStatus === 'succeeded') {
      navigate('/login')
    }
  }, [authStatus, navigate, isAuthenticated])

  useEffect(() => {
    if (username.length === 0) {
      setStatuses((prev) => ({ ...prev, username: 'empty' }))
      setErrors((prev) => ({ ...prev, username: '' }))
    } else if (username.length < 6) {
      setStatuses((prev) => ({ ...prev, username: 'error' }))
      setErrors((prev) => ({ ...prev, username: 'Mínimo 6 caracteres!' }))
    } else {
      setStatuses((prev) => ({ ...prev, username: 'success' }))
      setErrors((prev) => ({ ...prev, username: '' }))
    }
  }, [username])

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
    } else if (password.length < 8) {
      setStatuses((prev) => ({ ...prev, password: 'error' }))
      setErrors((prev) => ({ ...prev, password: 'Caracteres insuficientes!' }))
    } else {
      setStatuses((prev) => ({ ...prev, password: 'success' }))
      setErrors((prev) => ({ ...prev, password: '' }))
    }
  }, [password])

  useEffect(() => {
    if (password2.length === 0) {
      setStatuses((prev) => ({ ...prev, password2: 'empty' }))
      setErrors((prev) => ({ ...prev, password2: '' }))
      return
    }

    if (password2 !== password) {
      setStatuses((prev) => ({ ...prev, password2: 'error' }))
      setErrors((prev) => ({
        ...prev,
        password2: 'As senhas não são idênticas!',
      }))
    } else {
      if (password.length >= 8) {
        setStatuses((prev) => ({ ...prev, password2: 'success' }))
        setErrors((prev) => ({ ...prev, password2: '' }))
      }
    }
  }, [password, password2])

  const validateForm = () => {
    const newErrors = { username: '', email: '', password: '', password2: '' }
    let isValid = true

    if (statuses.username !== 'success') {
      newErrors.username = 'Mínimo 6 caracteres!'
      isValid = false
    }
    if (statuses.email !== 'success') {
      newErrors.email = 'Email inválido!'
      isValid = false
    }
    if (statuses.password !== 'success') {
      newErrors.password = 'Mínimo 8 caracteres!'
      isValid = false
    }
    if (statuses.password2 !== 'success') {
      newErrors.password2 = 'As senhas não são idênticas!'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (validateForm()) {
      dispatch(registerUser({ email, password, password2, username }))
    }
  }

  return (
    <AuthContainer>
      <CardForm>
        <S.Header>
          <h2>Cadastre-se</h2>
          <p>
            Possui conta? <Link to="/login">Entre agora.</Link>
          </p>
        </S.Header>
        <form onSubmit={submitForm}>
          <InputForm
            name="username"
            label="Nome de usuário"
            setContent={(e) => setUserName(e.target.value)}
            type="text"
            $status={statuses.username}
            error={errors.username}
            required
          />
          <InputForm
            name="email"
            label="Email"
            setContent={(e) => setEmail(e.target.value)}
            type="email"
            $status={statuses.email}
            error={errors.email}
            required
          />
          <InputForm
            name="password"
            label="Senha"
            setContent={(e) => setPassword(e.target.value)}
            type="password"
            $status={statuses.password}
            error={errors.password}
            required
          />
          <InputForm
            name="password2"
            label="Confirme a senha"
            setContent={(e) => setPassword2(e.target.value)}
            type="password"
            $status={statuses.password2}
            error={errors.password2}
            required
          />
          <FormButton status={authStatus} text="Cadastrar" />
        </form>
        {authStatus === 'failed' && authError && (
            typeof authError === 'object' && authError !== null ? (
              Object.values(authError).map((msg, index) => (
                <S.error key={index}>{msg as string}</S.error>
              ))
            ) : (
              <S.error>{authError as string}</S.error>
            )
        )}
      </CardForm>
    </AuthContainer>
  )
}

export default Register
