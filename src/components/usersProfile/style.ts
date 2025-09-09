import styled from 'styled-components'
import { color } from '../../style'

export const Container = styled.div`
  padding: 16px;
  border: 1px solid ${color.border};
  border-top: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${color.gray};

  div{
    display: flex;
    gap: 16px;
    align-items: center;

    h4{
      font-weight: 500;
      font-size: 16px;
    }
  }
`
export const FollowButton = styled.button`
  width: 88px;
  background: ${color.gray2};
  border: none;
  font-size: 14px;
  background-size: 200%;
  background-position: left;
  padding: 8px;
  border: 1px solid ${color.border};
  border-radius: 8px;
  font-weight: 500;
`
export const Profile = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
