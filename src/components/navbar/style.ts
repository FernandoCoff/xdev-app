import styled from 'styled-components'
import { color } from '../../style'

export const Navbar = styled.nav`
  max-width: 100px;
  width: 100%;
  height: 100dvh;
  background-color: ${color.bgPrimary};
  border-right: 1px solid ${color.border};
  z-index: 100;

  h2 {
    padding-top: 24px;
    text-align: center;
    font-weight: 600;
    font-size: 24px;
    position: relative;

    &::after {
      content: '';
      height: 3px;
      width: 50%;
      background: ${color.gradient};
      position: absolute;
      bottom: 0;
      left: 10%;
      border-radius: 3px;
    }
  }

  @media (max-width: 1300px) {
    box-shadow: none;
  }

  @media (max-width: 800px) {
    max-width: 100%;
    height: 80px;
    border: none;
    border-top: 1px solid ${color.border};
    position: fixed;
    left: 0;
    bottom: 0;

    h2 {
      display: none;
    }
  }
`
export const NavList = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 32px;
  list-style: none;
  gap: 32px;

  li {
    width: 100%;

    a {
      text-decoration: none;
    }

    button {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: none;
      font-size: 20px;
      transition: 0.4s;
      flex-wrap: nowrap;

      &:hover {
        color: ${color.primary};
      }
    }
  }

  @media (max-width: 800px) {
    flex-direction: row;
    justify-content: space-around;
    padding: 0;
    height: 100%;
  }
`
