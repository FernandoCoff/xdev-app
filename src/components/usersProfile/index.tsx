import * as S from './style'

export const UsersProfile = () =>{

  return(
    <S.Container>
        <div>
            <S.Profile>
            <img
              src="https://placehold.co/400x400/4747fc/white?text=x"
              alt="Imagem do usuário"
            />
          </S.Profile>
          <h4>Filister</h4>
        </div>
        <S.FollowButton>
          Seguir
        </S.FollowButton>
    </S.Container>
  )
}
