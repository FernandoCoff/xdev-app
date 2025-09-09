import { Link } from 'react-router-dom'
import { PiMagnifyingGlassBold,  PiArrowCircleLeftFill } from 'react-icons/pi'
import { UsersProfile } from '../usersProfile'
import * as S from './style'

export const SearchProfile = () => {
  return (
    <S.Container>
      <S.Search>
        <S.Control>
          <Link to="/">
            <PiArrowCircleLeftFill />
          </Link>
          <h2>Pesquisar</h2>
        </S.Control>
        <S.Input>
          <PiMagnifyingGlassBold />
          <input type="text" />
        </S.Input>
        <S.UserList>
          <li><UsersProfile/></li>
        </S.UserList>
      </S.Search>
    </S.Container>
  )
}
