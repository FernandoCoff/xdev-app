import styled from 'styled-components'
import { color } from '../../style'

export const Post = styled.div`
  width: 100%;
  padding: 16px;
  border: 1px solid ${color.border};
  background-color: ${color.gray};
  border-top: none;

  a {
    text-decoration: none;
    color: black;
    display: flex;
    align-items: start;
    justify-content: center;
    gap: 16px;
  }
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
export const Content = styled.div`
  width: 100%;
  flex: 1;
`
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;

  small {
    font-size: 14px;
    color: ${color.gray3};
  }

  h4 {
    font-size: 16px;
    font-weight: 500;
  }
`

export const Text = styled.p`
  width: 100%;
  font-size: 15px;
  margin-top: 4px;
`

export const Footer = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;

  div {
    border-radius: 24px;
    padding: 4px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    transition: 0.4s;

    span {
      font-size: 16px;
    }

    button {
      background-color: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 18px;
        height: 18px;
      }
    }
    &:hover {
      background-color: ${color.gray2};
    }
  }
`
