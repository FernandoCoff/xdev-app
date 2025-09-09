import {
  PiArrowSquareInBold,
  PiUserBold,
  PiHouseSimpleBold,
  PiMagnifyingGlassBold,
} from 'react-icons/pi'
import * as S from './style'
import { useAppDispatch } from '../../hooks'
import { logout } from '../../store/reducers/authSlice'
import { Link } from 'react-router'

export const NavBar = () => {
  const dispath = useAppDispatch()

  return (
    <S.Navbar>
      <h2>XD</h2>
      <S.NavList>
        <li>
          <Link to="/feed">
            <button>
              <PiHouseSimpleBold />
            </button>
          </Link>
        </li>
        <li>
          <Link to="/profiles">
            <button>
              <PiMagnifyingGlassBold />
            </button>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <button>
              <PiUserBold />
            </button>
          </Link>
        </li>
        <li>
          <button onClick={() => dispath(logout())}>
            <PiArrowSquareInBold />
          </button>
        </li>
      </S.NavList>
    </S.Navbar>
  )
}
