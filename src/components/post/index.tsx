import { PiHeartBold, PiChatTeardropTextBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import * as S from './style'

export const Post = () => {
  return (
    <S.Post>
      <Link to="/post/:id">
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
          <S.Footer>
            <div>
              <button>
                <PiHeartBold />
              </button>
              <span>0</span>
            </div>
            <div>
              <button>
                <PiChatTeardropTextBold />
              </button>
              <span>0</span>
            </div>
          </S.Footer>
        </S.Content>
      </Link>
    </S.Post>
  )
}
