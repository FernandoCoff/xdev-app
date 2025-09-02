import { Routes, Route } from 'react-router-dom'
import * as S from './style'
import { NavBar } from '../../components/navbar'


function Home() {


  return (
    <S.Home>
      <NavBar/>
      <S.Main>
        
      </S.Main>
    </S.Home>
  )
}

export default Home
