import * as S from './style'

export const Comment = () => {
  return (
    <S.Post>
      <S.Profile>
        <img
          src="https://placehold.co/400x400/4747fc/white?text=x"
          alt="Imagem do usuário"
        />
      </S.Profile>
      <S.Content>
        <S.Header>
          <h4>Filister</h4>
          <small> 21 H</small>
        </S.Header>
        <S.Text>
          meu hobby? falar com pessoas aleatórias aqui no Xdev rsrs 🤭
        </S.Text>
      </S.Content>
    </S.Post>
  )
}
