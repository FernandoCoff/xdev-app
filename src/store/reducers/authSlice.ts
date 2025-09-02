import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'
import axios from 'axios'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: undefined | null | object
}

interface RegisterCredentials {
  username: string
  email: string
  password: string
  password2: string
}

interface RegisterResponse {
  id: number
  username: string
  email: string
}

interface AuthResponse {
  token: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface ApiError {
  detail?: string
  key?: string
}

const API_URL = import.meta.env.VITE_API_BASE_URL
const userToken = localStorage.getItem('token')

const initialState: AuthState = {
  token: userToken || null,
  isAuthenticated: !!userToken,
  status: 'idle',
  error: null,
}

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: ApiError }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL + '/auth/login/', credentials)
    localStorage.setItem('token', response.data.token)
    return response.data
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>

    if (!error.response) {
      throw err
    }

    return rejectWithValue(error.response.data)
  }
})

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterCredentials,
  { rejectValue: ApiError }
>('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL + '/auth/register/', userData)
    // O registro bem-sucedido não retorna um token, apenas os dados do usuário
    return response.data
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token')
      state.token = null
      state.isAuthenticated = false
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = 'succeeded'
          state.token = action.payload.token
          state.isAuthenticated = true
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
        state.isAuthenticated = false
        state.token = null
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded'
        // Nota: Não autenticamos o usuário aqui. O status 'succeeded'
        // será usado pelo componente para redirecionar para o login.
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
