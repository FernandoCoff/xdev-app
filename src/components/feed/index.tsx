import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import { PiArrowCircleDownFill } from "react-icons/pi";
import { Post } from '../post'
import * as S from './style'

export const Feed = () => {
  const { user } = useAppSelector((state) => state.auth)

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
            name="post"
            id="post"
            placeholder="Quais são as novidades?"
          ></textarea>
          <button>Postar</button>
        </S.CreatePost>
        <S.PostList>
          <li>
            <Post />
          </li>
        </S.PostList>
      </S.FeedContainer>
    </S.Feed>
  )
}
