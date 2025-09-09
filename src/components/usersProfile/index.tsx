import * as S from './style'

type UsersProfileProps = {
  avatar: string
  username: string
  follow: boolean
  onFollowToggle: () => void
}

export const UsersProfile = ({
  avatar,
  username,
  follow,
  onFollowToggle,
}: UsersProfileProps) => {
  const handleFollowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onFollowToggle()
  }

  return (
    <S.Container>
      <div>
        <S.Profile>
          <img
            src={avatar || 'https://placehold.co/100x100/4747fc/white?text=x'}
            alt={`Imagem do usuário ${username}`}
          />
        </S.Profile>
        <h4>{username}</h4>
      </div>
      <S.FollowButton onClick={handleFollowClick}>
        {follow ? 'Seguindo' : 'Seguir'}
      </S.FollowButton>
    </S.Container>
  )
}
