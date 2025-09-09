import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PiMagnifyingGlassBold, PiArrowCircleLeftFill } from 'react-icons/pi'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { toggleFollow } from '../../store/reducers/profileSlice'
import { fetchMyProfile } from '../../store/reducers/authSlice'
import { UsersProfile } from '../usersProfile'
import * as S from './style'

export const Followes = () => {
  const [query, setQuery] = useState('')
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const followingIds = useMemo(() => {
    return new Set(user?.follows.map((u) => u.user.id))
  }, [user?.follows])

  const filteredFollowers = useMemo(() => {
    if (!user?.followed_by) {
      return []
    }
    if (!query) {
      return user.followed_by
    }
    return user.followed_by.filter((follower) =>
      follower.user.username.toLowerCase().includes(query.toLowerCase()),
    )
  }, [user?.followed_by, query])
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
          <h2>Seguidores</h2>
        </S.Control>
        <S.Input>
          <PiMagnifyingGlassBold />
          <input
            type="text"
            placeholder="Buscar seguidores..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </S.Input>
        <S.UserList>
          {filteredFollowers.map((follower) => (
            <li key={follower.user.id}>
              <UsersProfile
                avatar={
                  follower.profile_picture ||
                  'https://placehold.co/100x100/4747fc/white?text=x'
                }
                username={follower.user.username}
                follow={followingIds.has(follower.user.id)}
                onFollowToggle={() =>
                  handleFollowToggle(follower.user.username)
                }
              />
            </li>
          ))}
          {(!user || user.followed_by.length === 0) && (
            <li>Você ainda não tem seguidores.</li>
          )}
        </S.UserList>
      </S.Search>
    </S.Container>
  )
}
