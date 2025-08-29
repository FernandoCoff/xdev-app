import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import image from '../../assets/images/logo.svg'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { loginUser } from '../../store/reducers/authSlice'
import { ButtonLoading } from '../../components/buttons/loadingButtons'
import { FormComponent } from '../../components/form'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, isAuthenticated, error } = useAppSelector(
    (state) => state.auth,
  )

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="flex h-dvh flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src={image} className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-3xl/9 font-medium tracking-tight text-white">
          Boas-vindas novamente
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={submitForm} className="space-y-6">
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
          {status === 'failed' && error && (
            <div className="text-sm text-red-400">
              {'Email ou senha inválidos. Tente novamente.'}
            </div>
          )}
          <div>
            <ButtonLoading status={status} text="Entrar" />
          </div>
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Precisando de uma conta?
          {' ' /* PARA DAR ESPAÇO ENTRE O TEXTO E O LINK */}
          <Link
            to="/register"
            className="font-normal text-blue-400 hover:text-blue-300"
          >
            Registre-se.
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
