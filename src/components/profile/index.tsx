import { useState, useEffect, useRef, type FormEvent } from 'react'
import * as S from './style'
import { FormButton } from '../formButton'
import { InputForm } from '../inputForm'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { resetStatus } from '../../store/reducers/authSlice'
import {
  updateUserProfile,
  updateUserPicture,
} from '../../store/reducers/authSlice'

type StatusType = 'success' | 'error' | 'empty'

interface UpdateProfilePayload {
  username?: string
  email?: string
  password?: string
  password2?: string
}

export const Profile = () => {
  const dispatch = useAppDispatch()
  const { user, status: authStatus } = useAppSelector((state) => state.auth)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [email, setEmail] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
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
    dispatch(resetStatus())
  })

  useEffect(() => {
    if (user) {
      setUserName(user.user.username || '')
      setEmail(user.user.email || '')
    }
  }, [user])

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

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      dispatch(updateUserPicture(file))
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const payload: UpdateProfilePayload = {}

    if (
      user &&
      user.user.username !== username &&
      statuses.username === 'success'
    ) {
      payload.username = username
    }
    if (user && user.user.email !== email && statuses.email === 'success') {
      payload.email = email
    }

    if (
      password &&
      statuses.password === 'success' &&
      statuses.password2 === 'success'
    ) {
      payload.password = password
      payload.password2 = password2
      setPassword('')
      setPassword2('')
    }

    if (Object.keys(payload).length > 0) {
      dispatch(updateUserProfile(payload))
    }
  }

  return (
    <S.Profile>
      <S.ProfileImage>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <div onClick={handleImageClick} style={{ cursor: 'pointer' }}>
          <img
            src={
              user?.profile_picture ||
              'https://placehold.co/400x400/4747fc/white?text=x'
            }
            alt="Foto do usuário"
          />
          <button type="button" onClick={handleImageClick}>
            Alterar foto
          </button>
        </div>
        <S.FollowContainer>
          <S.FollowItem>
            <span>0</span>
            <p>Publicações</p>
          </S.FollowItem>
          <S.FollowItem>
            <span>0</span>
            <p>Seguindo</p>
          </S.FollowItem>
          <S.FollowItem>
            <span>0</span>
            <p>Seguidores</p>
          </S.FollowItem>
        </S.FollowContainer>
      </S.ProfileImage>
      <form onSubmit={handleSubmit}>
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
        <FormButton
          status={authStatus === 'loading' ? 'loading' : 'idle'}
          text="Salvar Alterações"
        />
        {authStatus === 'failed' && (
          <S.err>Não foi possível concluir a solicitação!</S.err>
        )}

        {authStatus === 'succeeded' && (
          <S.ok>Alteração salva com sucesso!</S.ok>
        )}
      </form>
    </S.Profile>
  )
}
