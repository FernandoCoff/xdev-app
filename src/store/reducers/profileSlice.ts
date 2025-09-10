import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'
import api from '../../services/api'
import type { UserProfile, ApiError } from '../types'

interface ProfileState {
  profiles: UserProfile[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProfileState = {
  profiles: [],
  status: 'idle',
  error: null,
}

export const searchProfiles = createAsyncThunk<
  UserProfile[],
  string,
  { rejectValue: ApiError }
>('profiles/search', async (query, { rejectWithValue }) => {
  try {
    const response = await api.get(`/auth/profiles/?search=${query}`)
    return response.data
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>
    if (!error.response) throw err
    return rejectWithValue(error.response.data)
  }
})

export const toggleFollow = createAsyncThunk<
  { status: string },
  string,
  { rejectValue: ApiError }
>('profiles/toggleFollow', async (username, { rejectWithValue }) => {
  try {
    const response = await api.post(`/auth/profile/${username}/follow/`)
    return response.data
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>
    if (!error.response) throw err
    return rejectWithValue(error.response.data)
  }
})

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProfiles.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(searchProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.profiles = action.payload
      })
      .addCase(searchProfiles.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(toggleFollow.fulfilled, (state, action) => {
        const username = action.meta.arg
        const profile = state.profiles.find((p) => p.user.username === username)

        if (profile) {
          const wasFollowing = profile.is_following
          profile.is_following = !wasFollowing
          if (wasFollowing) {
            profile.followed_by_count -= 1
          } else {
            profile.followed_by_count += 1
          }
        }
      })
      .addCase(toggleFollow.rejected, () => {
        console.error('Falha ao seguir o utilizador.')
      })
  },
})

export default profileSlice.reducer
