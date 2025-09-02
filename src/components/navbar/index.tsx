import * as S from './style'
import { useAppDispatch } from '../../hooks'
import { logout } from '../../store/reducers/authSlice'

export const NavBar = () => {

  const dispath = useAppDispatch()

  return(
    <S.Navbar>
      <h2>Xdev</h2>
      <S.NavList>
        <li>
          <button>
            <i className="fa-solid fa-house"></i>
            <p>Página inicial</p>
            </button>
        </li>
        <li>
          <button>
            <i className="fa-regular fa-user"></i>
            <p>Perfil</p>
          </button>
        </li>
        <li>
          <button onClick={()=> dispath(logout())}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <p>Sair</p>
          </button>
        </li>
      </S.NavList>
    </S.Navbar>
  )
}
