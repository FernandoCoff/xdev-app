import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'
import api from '../../services/api'
import type { Post, ApiError, LikeToggleResponse, Comment } from '../types'

interface PostsState {
  posts: Post[]
  selectedPost: Post | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: ApiError | null | undefined
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: ApiError }
>('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/post/posts/')
    return response.data
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>
    if (!error.response) throw err
    return rejectWithValue(error.response.data)
  }
})

export const fetchFeedPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: ApiError }
>('posts/fetchFeedPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/post/posts/feed/')
    return response.data
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>
    if (!error.response) throw err
    return rejectWithValue(error.response.data)
  }
})

export const fetchPostById = createAsyncThunk<
  Post,
  number,
  { rejectValue: ApiError }
>('posts/fetchPostById', async (postId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/post/posts/${postId}/`)
    return response.data
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>
    if (!error.response) throw err
    return rejectWithValue(error.response.data)
  }
})

export const createPost = createAsyncThunk<
  Post,
  { content: string },
  { rejectValue: ApiError }
>('posts/createPost', async (postData, { rejectWithValue }) => {
  try {
    const response = await api.post('/post/posts/', postData)
    return response.data
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>
    if (!error.response) throw err
    return rejectWithValue(error.response.data)
  }
})

export const createComment = createAsyncThunk<
  Comment,
  { postId: number; content: string },
  { rejectValue: ApiError }
>('posts/createComment', async ({ postId, content }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/post/posts/${postId}/comments/`, {
      content,
    })
    return response.data
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>
    if (!error.response) throw err
    return rejectWithValue(error.response.data)
  }
})

export const toggleLike = createAsyncThunk<
  LikeToggleResponse,
  { postId: number; currentUserId: number },
  { rejectValue: ApiError }
>('posts/toggleLike', async ({ postId }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/post/posts/${postId}/like_toggle/`)
    return response.data
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>
    if (!error.response) throw err
    return rejectWithValue(error.response.data)
  }
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(fetchFeedPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchFeedPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.status = 'succeeded'
          state.posts = action.payload
        },
      )
      .addCase(fetchFeedPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.unshift(action.payload)
      })
      .addCase(fetchPostById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchPostById.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.status = 'succeeded'
          state.selectedPost = action.payload
        },
      )
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = 'failed'
        state.selectedPost = null
        state.error = action.payload
      })
      .addCase(
        createComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          if (state.selectedPost?.comments) {
            state.selectedPost.comments.push(action.payload)
          }
        },
      )
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { postId, currentUserId } = action.meta.arg
        const post = state.posts.find((p) => p.id === postId)
        if (post) {
          post.like_count = action.payload.like_count
          if (action.payload.liked) {
            post.likes.push(currentUserId)
          } else {
            post.likes = post.likes.filter((id) => id !== currentUserId)
          }
        }
      })
      .addCase(toggleLike.rejected, (_, action) => {
        console.error('Falha ao curtir o post:', action.payload)
      })
  },
})

export const { resetStatus } = postsSlice.actions
export default postsSlice.reducer
