import { Outlet } from 'react-router'
import * as S from './style'
import { NavBar } from '../../components/navbar'

function Home() {
  return (
    <S.Home>
      <NavBar />
      <S.Main>
        <Outlet />
      </S.Main>
    </S.Home>
  )
}

export default Home
