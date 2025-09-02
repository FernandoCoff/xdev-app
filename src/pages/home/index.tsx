import { Outlet } from 'react-router'
import * as S from './style'
import { NavBar } from '../../components/navbar'
import { Follow } from '../../components/follow'

function Home() {
  return (
    <S.Home>
      <NavBar />
      <S.Main>
        <Outlet />
        <Follow />
      </S.Main>
    </S.Home>
  )
}

export default Home
