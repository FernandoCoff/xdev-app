import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { fetchPostById, createComment } from '../../store/reducers/postSlice'
import { PiArrowCircleLeftFill } from 'react-icons/pi'
import { Comment as CommentComponent } from '../comment'
import * as S from './style'

export const PostDetail = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()
  const postId = Number(id)

  const { user } = useAppSelector((state) => state.auth)
  const { selectedPost, status } = useAppSelector((state) => state.post)
  const [commentContent, setCommentContent] = useState('')

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId))
    }
  }, [postId, dispatch])

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (commentContent.trim() && postId) {
      dispatch(createComment({ postId, content: commentContent.trim() }))
      setCommentContent('')
    }
  }

  if (status === 'loading' && !selectedPost) {
    return <S.Container>Carregando...</S.Container>
  }

  if (status === 'failed' || !selectedPost) {
    return <S.Container>Post não encontrado ou erro ao carregar.</S.Container>
  }

  return (
    <S.Container>
      <S.PostContainer>
        <S.Control>
          <Link to="/">
            <PiArrowCircleLeftFill />
          </Link>
          <h2>Comentários</h2>
        </S.Control>
        <S.Post>
          <S.Picture>
            <img
              src={
                selectedPost.author.avatar ||
                'https://placehold.co/100x100/4747fc/white?text=x'
              }
              alt="Imagem do usuário"
            />
          </S.Picture>
          <S.Content>
            <S.Header>
              <h4>{selectedPost.author.username}</h4>
              <small>{selectedPost.created_since}</small>
            </S.Header>
            <S.Text>{selectedPost.content}</S.Text>
          </S.Content>
        </S.Post>
        <S.ListComment>
          {selectedPost.comments?.map((comment) => (
            <li key={comment.id}>
              <CommentComponent
                avatar={
                  comment.author.avatar ||
                  'https://placehold.co/100x100/4747fc/white?text=x'
                }
                username={comment.author.username}
                createdAt={comment.created_since}
                content={comment.content}
              />
            </li>
          ))}
        </S.ListComment>
        <S.Coment as="form" onSubmit={handleCommentSubmit}>
          <S.Picture>
            <Link to={`/profile`}>
              <img
                src={
                  user?.profile_picture ||
                  'https://placehold.co/100x100/4747fc/white?text=x'
                }
                alt="Imagem do usuário"
              />
            </Link>
          </S.Picture>
          <textarea
            name="comment"
            id="comment"
            placeholder="Escrever novo comentário"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          ></textarea>
          <button type="submit" disabled={!commentContent.trim()}>
            Comentar
          </button>
        </S.Coment>
      </S.PostContainer>
    </S.Container>
  )
}
