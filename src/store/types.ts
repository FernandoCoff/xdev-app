export interface Author {
  id: number
  username: string
  avatar: string | null
}

export interface Profile {
  user: BasicUser
  profile_picture: string
  follows_count: number
  followed_by_count: number
  is_following: boolean
}

export interface Comment {
  id: number
  author: Author
  post: number
  content: string
  created_since: string
}

export interface Post {
  id: number
  author: Author
  content: string
  like_count: number
  comment_count: number
  created_since: string
  likes: number[]
  comments?: Comment[]
}

export interface LikeToggleResponse {
  like_count: number
  liked: boolean
}

export interface BasicUser {
  id: number
  username: string
  email: string
}

export interface UserProfile {
  user: BasicUser
  profile_picture: string | null
  follows_count: number
  followed_by_count: number
  is_following: boolean
  post_count: number
}

export interface Author {
  id: number
  username: string
  avatar: string | null
}

export interface Comment {
  id: number
  author: Author
  post: number
  content: string
  created_at: string
  created_since: string
}

export interface Post {
  id: number
  author: Author
  content: string
  like_count: number
  comment_count: number
  created_since: string
  likes: number[]
  comments?: Comment[]
}

export interface LikeToggleResponse {
  like_count: number
  liked: boolean
}

export interface ApiError {
  detail?: string
  [key: string]: string | string[] | undefined
}
