import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'
import axios from 'axios'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { toggleFollow } from './profileSlice'

interface BasicUser {
  id: number
  username: string
  email: string
}

export interface FollowerInfo {
  user: BasicUser
  profile_picture: string | null
}

export interface UserProfile {
  user: BasicUser
  profile_picture: string | null
  follows: FollowerInfo[]
  followed_by: FollowerInfo[]
  follows_count: number
  followed_by_count: number
  is_following: boolean
  post_count: number
}

interface AuthState {
  user: UserProfile | null
  token: string | null
  isAuthenticated: boolean
  following: UserProfile[] | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: undefined | null | object
}

interface UpdateProfilePayload {
  username?: string
  email?: string
  password?: string
  password2?: string
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
    if (!error.response) throw err
    return rejectWithValue(error.response.data)
  }
})

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterCredentials,
  { rejectValue: ApiError }
>('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL + '/auth/register/', userData);
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>;

    if (!error.response) {
      return rejectWithValue({ detail: 'Erro de conexão. Verifique sua internet ou tente novamente mais tarde.' } as ApiError);
    }
    return rejectWithValue(error.response.data);
  }
});
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
    if (!error.response) throw err
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
      if (!error.response) throw err
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
      if (!error.response) throw err
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
      if (!error.response) throw err
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
    if (!error.response) throw err
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
      .addCase(registerUser.fulfilled, (state) => {
          state.status = 'succeeded';
        })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      })
      .addCase(updateUserPicture.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.user) {
          state.user.profile_picture = action.payload.profile_picture;
        }
      })
      .addCase(toggleFollow.fulfilled, (state, action) => {
        if (state.user) {
          const status = action.payload.status;
          if (status === 'followed') {
            state.user.follows_count += 1;
          } else if (status === 'unfollowed') {
            state.user.follows_count -= 1;
          }
        }
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
    .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<ApiError>) => {
          state.status = 'failed';
          state.error = action.payload;
          state.isAuthenticated = false;
          state.user = null;

          if (action.type.includes('fetchMyProfile')) {
              state.token = null;
              localStorage.removeItem('token');
          }
        }
      );
  },
})

export const { logout, resetStatus } = authSlice.actions
export default authSlice.reducer
