import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { fetchPosts, createPost } from '../../store/reducers/postSlice'
import { PiArrowCircleDownFill } from 'react-icons/pi'
import { Post } from '../post'
import * as S from './style'

export const Feed = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { posts, status } = useAppSelector((state) => state.post)
  const [postContent, setPostContent] = useState('')

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handlePostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (postContent.trim()) {
      dispatch(createPost({ content: postContent.trim() }))
      setPostContent('')
    }
  }

  return (
    <S.Feed>
      <S.FeedContainer>
        <S.Control>
          <button>
            <PiArrowCircleDownFill />
          </button>
          <h2>Para você</h2>
        </S.Control>
        <S.CreatePost>
          <S.Picture>
            <Link to={`/profile/${user?.user.username}`}>
              <img
                src={
                  user?.profile_picture ||
                  'https://placehold.co/100x100/4747fc/white?text=x'
                }
                alt="Imagem do usuário"
              />
            </Link>
          </S.Picture>
          <form onSubmit={handlePostSubmit}>
            <textarea
              name="post"
              id="post"
              placeholder="Quais são as novidades?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
            <button type="submit" disabled={!postContent.trim()}>
              Postar
            </button>
          </form>
        </S.CreatePost>
        <S.PostList>
          {status === 'succeeded' &&
            posts.map((post) => (
              <li key={post.id}>
                <Post
                  id={post.id}
                  avatar={
                    post.author.avatar ||
                    'https://placehold.co/100x100/4747fc/white?text=x'
                  }
                  username={post.author.username}
                  createdAt={post.created_since}
                  content={post.content}
                  commentsNumber={post.comment_count}
                  likesNumber={post.like_count}
                  like={user ? post.likes.includes(user.user.id) : false}
                />
              </li>
            ))}
          {status === 'failed' && <li>Ocorreu um erro ao buscar os posts.</li>}
        </S.PostList>
      </S.FeedContainer>
    </S.Feed>
  )
}
