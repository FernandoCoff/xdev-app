import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PiMagnifyingGlassBold, PiArrowCircleLeftFill } from 'react-icons/pi'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { searchProfiles, toggleFollow } from '../../store/reducers/profileSlice'
import { UsersProfile } from '../usersProfile'
import * as S from './style'

export const SearchProfile = () => {
  const [query, setQuery] = useState('')
  const dispatch = useAppDispatch()
  const { profiles, status } = useAppSelector((state) => state.profile)

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(searchProfiles(query))
    }, 300)

    return () => {
      clearTimeout(timerId)
    }
  }, [query, dispatch])

  const handleFollowToggle = (username: string) => {
    dispatch(toggleFollow(username))
  }

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
          <input
            type="text"
            placeholder="Buscar usuários..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </S.Input>
        <S.UserList>
          {status === 'succeeded' &&
            profiles.map((profile) => (
              <li key={profile.user.id}>
                <UsersProfile
                  avatar={
                    profile.profile_picture ||
                    'https://placehold.co/100x100/4747fc/white?text=x'
                  }
                  username={profile.user.username}
                  follow={profile.is_following}
                  onFollowToggle={() =>
                    handleFollowToggle(profile.user.username)
                  }
                />
              </li>
            ))}
        </S.UserList>
      </S.Search>
    </S.Container>
  )
}
