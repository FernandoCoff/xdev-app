import * as S from './style'
import { useAppDispatch } from '../../hooks'
import { logout } from '../../store/reducers/authSlice'
import { Link } from 'react-router'

export const NavBar = () => {
  const dispath = useAppDispatch()

  return (
    <S.Navbar>
      <h2>Xdev</h2>
      <S.NavList>
        <li>
          <Link to="/feed">
            <button>
              <i className="fa-solid fa-house"></i>
            </button>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <button>
              <i className="fa-regular fa-user"></i>
            </button>
          </Link>
        </li>
        <li>
          <button onClick={() => dispath(logout())}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </li>
      </S.NavList>
    </S.Navbar>
  )
}
