import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import image from '../../assets/images/logo.svg'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { registerUser } from '../../store/reducers/authSlice'
import { ButtonLoading } from '../../components/buttons/loadingButtons'
import { FormComponent } from '../../components/form'

function Register() {
  const { status, error } = useAppSelector((state) => state.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUserName] = useState('')
  const [password2, setPassword2] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(registerUser({ email, password, password2, username }))
  }

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/login')
    }
  }, [status, navigate, dispatch])

  return (
    <div className="flex h-dvh flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src={image} className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-3xl/9 font-medium tracking-tight text-white">
          Criar uma conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={submitForm} className="space-y-6">
          <FormComponent
            label="Nome de usuário"
            name="username"
            type="text"
            setContent={({ target }) => setUserName(target.value)}
            required
          />
          <FormComponent
            label="Email"
            name="email"
            type="email"
            setContent={({ target }) => setEmail(target.value)}
            required
          />
          <FormComponent
            label="Senha"
            name="password"
            type="password"
            setContent={({ target }) => setPassword(target.value)}
            required
          />
          <FormComponent
            label="Confirmação de Senha"
            name="password2"
            type="password"
            setContent={({ target }) => setPassword2(target.value)}
            required
          />

          {status === 'failed' && error && (
            <div className="space-y-1 text-sm text-red-400">
              {Object.entries(error).map(([key, value]) => (
                <p key={key}>
                  {Array.isArray(value) ? value.join(', ') : value}
                </p>
              ))}
            </div>
          )}

          <div>
            <ButtonLoading status={status} text="Cadastrar" />
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Já possui uma conta?{' ' /* PARA DAR ESPAÇO ENTRE O TEXTO E O LINK */}
          <Link
            to="/login"
            className="font-normal text-blue-400 hover:text-blue-300"
          >
            Entre agora.
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
