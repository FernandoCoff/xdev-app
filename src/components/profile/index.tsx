import { useState, useEffect } from 'react'
import * as S from './style'
import { FormButton } from '../formButton'
import { InputForm } from '../inputForm'

type StatusType = 'success' | 'error' | 'empty'

export const Profile = () => {
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

  return (
    <S.Profile>
      <S.ProfileImage>
        <div>
          <img
            src="https://placehold.co/400x400/4747fc/white?text=D"
            alt="Foto do usuário"
          />
          <button>Alterar foto</button>
        </div>
        <p>
          Foto de perfil <br />
          (clique para alterar)
        </p>
      </S.ProfileImage>
      <form>
        <h2>Editar Perfil</h2>
        <InputForm
          name="username"
          label="Nome de usuário"
          setContent={(e) => setUserName(e.target.value)}
          type="text"
          $status={statuses.username}
          error={errors.username}
          value={username}
        />
        <InputForm
          name="email"
          label="Email"
          setContent={(e) => setEmail(e.target.value)}
          type="email"
          $status={statuses.email}
          error={errors.email}
          value={email}
        />
        <InputForm
          name="password"
          label="Nova Senha"
          setContent={(e) => setPassword(e.target.value)}
          type="password"
          $status={statuses.password}
          error={errors.password}
          value={password}
        />
        <InputForm
          name="password2"
          label="Confirme a nova senha"
          setContent={(e) => setPassword2(e.target.value)}
          type="password"
          $status={statuses.password2}
          error={errors.password2}
          value={password2}
        />
        <FormButton status="idle" text="editar" />
      </form>
    </S.Profile>
  )
}
