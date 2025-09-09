import { PiArrowCircleLeftFill } from 'react-icons/pi'
import { Comment } from '../comment'
import { useAppSelector } from '../../hooks'
import { Link } from 'react-router-dom'
import * as S from './style'

export const PostDetail = () => {
  const { user } = useAppSelector((state) => state.auth)

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
              src="https://placehold.co/400x400/4747fc/white?text=x"
              alt="Imagem do usuário"
            />
          </S.Picture>
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
        <S.ListComment>
          <li>
            <Comment />
          </li>
        </S.ListComment>
        <S.Coment>
          <S.Picture>
            <Link to="/profile">
              <img
                src={
                  user?.profile_picture ||
                  'https://placehold.co/400x400/4747fc/white?text=x'
                }
                alt="Imagem do usuário"
              />
            </Link>
          </S.Picture>
          <textarea
            name="comment"
            id="comment"
            placeholder="Escrever novo comentário"
          ></textarea>
          <button>Comentar</button>
        </S.Coment>
      </S.PostContainer>
    </S.Container>
  )
}
