import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'
import axios from 'axios'
import type { RootState } from '../index'

interface BasicUser {
  id: number
  username: string
  email: string
}

interface UserProfile {
  user: BasicUser
  profile_picture: string
  follows: BasicUser[]
  followed_by: BasicUser[]
  follows_count: number
  followed_by_count: number
}

interface AuthState {
  user: UserProfile | null
  token: string | null
  isAuthenticated: boolean
  following: UserProfile[] | null // Adicionado para a lista de "seguindo"
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: undefined | null | object
}

interface UpdateProfilePayload {
  username?: string
  email?: string
}

interface UpdateProfilePayload {
  username?: string
  email?: string
  password?: string
  password2?: string
}

interface UserProfile {
  username: string
  email: string
  avatarUrl: string
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
  [key: string]: string | string[] | undefined
}

const API_URL = import.meta.env.VITE_API_BASE_URL
const userToken = localStorage.getItem('token')

const initialState: AuthState = {
  user: null,
  token: userToken || null,
  isAuthenticated: !!userToken,
  following: null,
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
    return response.data
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data)
  }
})

export const fetchUserProfile = createAsyncThunk<
  UserProfile,
  string,
  { state: RootState; rejectValue: ApiError }
>('auth/fetchUserProfile', async (username, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token
    if (!token) {
      return rejectWithValue({ detail: 'Nenhum token encontrado.' })
    }
    const response = await axios.get(`${API_URL}/auth/profile/${username}/`, {
      headers: { Authorization: `Token ${token}` },
    })
    return response.data
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data)
  }
})

export const updateUserProfile = createAsyncThunk<
  UserProfile,
  UpdateProfilePayload,
  { state: RootState; rejectValue: ApiError }
>(
  'auth/updateUserProfile',
  async (profileData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token
      if (!token) {
        return rejectWithValue({ detail: 'Nenhum token encontrado.' })
      }

      const response = await axios.patch(
        `${API_URL}/auth/profile/me/update/`,
        profileData,
        {
          headers: { Authorization: `Token ${token}` },
        },
      )
      return response.data
    } catch (err: unknown) {
      const error = err as AxiosError<ApiError>
      if (!error.response) {
        throw err
      }
      return rejectWithValue(error.response.data)
    }
  },
)

export const updateUserPicture = createAsyncThunk<
  UserProfile,
  File,
  { state: RootState; rejectValue: ApiError }
>(
  'auth/updateUserPicture',
  async (pictureFile, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token
      if (!token) {
        return rejectWithValue({ detail: 'Nenhum token encontrado.' })
      }

      const formData = new FormData()
      formData.append('profile_picture', pictureFile)

      const response = await axios.patch(
        `${API_URL}/auth/profile/me/update-picture/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      return response.data
    } catch (err: unknown) {
      const error = err as AxiosError<ApiError>
      if (!error.response) {
        throw err
      }
      return rejectWithValue(error.response.data)
    }
  },
)

export const fetchFollowingList = createAsyncThunk<
  UserProfile[],
  string,
  { state: RootState; rejectValue: ApiError }
>(
  'auth/fetchFollowingList',
  async (username, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token
      if (!token) {
        return rejectWithValue({ detail: 'Nenhum token encontrado.' })
      }

      const response = await axios.get(
        `${API_URL}/auth/profile/${username}/follow/`,
        {
          headers: { Authorization: `Token ${token}` },
        },
      )

      return response.data
    } catch (err: unknown) {
      const error = err as AxiosError<ApiError>
      if (!error.response) {
        throw err
      }
      return rejectWithValue(error.response.data)
    }
  },
)

export const fetchMyProfile = createAsyncThunk<
  UserProfile,
  void,
  { state: RootState; rejectValue: ApiError }
>('auth/fetchMyProfile', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token
    if (!token) {
      return rejectWithValue({ detail: 'Nenhum token encontrado.' })
    }
    const response = await axios.get(`${API_URL}/auth/profile/me/`, {
      headers: { Authorization: `Token ${token}` },
    })
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
      state.user = null
      state.following = null
      state.isAuthenticated = false
      state.status = 'idle'
    },
    resetStatus: (state) => {
      state.status = 'idle'
      state.error = null
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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.status = 'succeeded'
          state.user = action.payload
          state.isAuthenticated = true
        },
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
        state.user = null
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(updateUserPicture.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(updateUserPicture.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(
        updateUserPicture.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.status = 'succeeded'
          if (state.user) {
            state.user = { ...state.user, ...action.payload }
          } else {
            state.user = action.payload
          }
        },
      )
      .addCase(
        updateUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.status = 'succeeded'
          if (state.user) {
            state.user = { ...state.user, ...action.payload }
          } else {
            state.user = action.payload
          }
        },
      )

      .addCase(fetchFollowingList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(
        fetchFollowingList.fulfilled,
        (state, action: PayloadAction<UserProfile[]>) => {
          state.status = 'succeeded'
          state.following = action.payload
        },
      )
      .addCase(fetchFollowingList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
        state.following = null
      })

      .addCase(fetchMyProfile.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchMyProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.status = 'succeeded'
          state.user = action.payload
          state.isAuthenticated = true
        },
      )
      .addCase(fetchMyProfile.rejected, (state) => {
        state.status = 'failed'
        state.isAuthenticated = false
        state.token = null
        localStorage.removeItem('token')
      })
  },
})

export const { logout, resetStatus } = authSlice.actions
export default authSlice.reducer
