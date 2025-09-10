import * as S from './style'

type CommentType = {
  avatar: string
  createdAt: string
  username: string
  content: string
}

export const Comment = ({
  avatar,
  createdAt,
  username,
  content,
}: CommentType) => {
  return (
    <S.Post>
      <S.Profile>
        <img
          src={avatar || 'https://placehold.co/400x400/4747fc/white?text=x'}
          alt="Imagem do usuário"
        />
      </S.Profile>
      <S.Content>
        <S.Header>
          <h4>{username}</h4>
          <small>{createdAt}</small>
        </S.Header>
        <S.Text>{content}</S.Text>
      </S.Content>
    </S.Post>
  )
}
