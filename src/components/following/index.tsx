import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PiMagnifyingGlassBold, PiArrowCircleLeftFill } from 'react-icons/pi'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { toggleFollow } from '../../store/reducers/profileSlice'
import { fetchMyProfile } from '../../store/reducers/authSlice'
import { UsersProfile } from '../usersProfile'
import * as S from './style'

export const Following = () => {
  const [query, setQuery] = useState('')
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  // Filtra a lista de pessoas que o utilizador segue com base na pesquisa
  const filteredFollowing = useMemo(() => {
    if (!user?.follows) {
      return []
    }
    if (!query) {
      return user.follows
    }
    return user.follows.filter((person) =>
      person.user.username.toLowerCase().includes(query.toLowerCase()),
    )
  }, [user?.follows, query])

  // Lida com o clique no botão de seguir/deixar de seguir
  const handleFollowToggle = async (username: string) => {
    await dispatch(toggleFollow(username))
    dispatch(fetchMyProfile())
  }

  return (
    <S.Container>
      <S.Search>
        <S.Control>
          <Link to="/profile">
            <PiArrowCircleLeftFill />
          </Link>
          <h2>Seguindo</h2>
        </S.Control>
        <S.Input>
          <PiMagnifyingGlassBold />
          <input
            type="text"
            placeholder="Buscar quem você segue"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </S.Input>
        <S.UserList>
          {filteredFollowing.map((person) => (
            <li key={person.user.id}>
              <UsersProfile
                avatar={
                  person.profile_picture ||
                  'https://placehold.co/100x100/4747fc/white?text=x'
                }
                username={person.user.username}
                follow={true}
                onFollowToggle={() => handleFollowToggle(person.user.username)}
              />
            </li>
          ))}
          {(!user || user.follows.length === 0) && (
            <S.Info>Você ainda não segue ninguém.</S.Info>
          )}
        </S.UserList>
      </S.Search>
    </S.Container>
  )
}
