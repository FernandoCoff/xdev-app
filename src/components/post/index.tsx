import {
  PiHeartBold,
  PiChatTeardropTextBold,
  PiHeartFill,
} from 'react-icons/pi'
import { Link } from 'react-router-dom'
import * as S from './style'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { toggleLike } from '../../store/reducers/postSlice'

type PostType = {
  username: string
  createdAt: string
  content: string
  avatar: string
  likesNumber: number
  commentsNumber: number
  id: number
  like?: boolean
}

export const Post = ({
  username,
  createdAt,
  avatar,
  likesNumber,
  commentsNumber,
  like,
  content,
  id,
}: PostType) => {
  const dispatch = useAppDispatch()
  const { user: currentUser } = useAppSelector((state) => state.auth)

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (currentUser) {
      dispatch(toggleLike({ postId: id, currentUserId: currentUser.user.id }))
    } else {
      console.error('Usuário precisa estar logado para curtir.')
    }
  }

  return (
    <S.Post>
      <Link to={`/post/${id}`}>
        <S.Profile>
          <img
            src={avatar || 'https://placehold.co/100x100/4747fc/white?text=x'}
            alt="Imagem do usuário"
          />
        </S.Profile>
        <S.Content>
          <S.Header>
            <h4>{username}</h4>
            <small>{createdAt}</small>
          </S.Header>
          <S.Text>{content}</S.Text>
          <S.Footer>
            <div onClick={handleLikeClick}>
              <button>{like ? <PiHeartFill /> : <PiHeartBold />}</button>
              <span>{likesNumber}</span>
            </div>
            <div>
              <button>
                <PiChatTeardropTextBold />
              </button>
              <span>{commentsNumber}</span>
            </div>
          </S.Footer>
        </S.Content>
      </Link>
    </S.Post>
  )
}
