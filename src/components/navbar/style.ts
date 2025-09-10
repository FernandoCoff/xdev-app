import styled from 'styled-components'
import { color } from '../../style'

export const Navbar = styled.nav`
  max-width: 80px;
  width: 100%;
  height: 100dvh;
  background-color: ${color.bgPrimary};
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
      width: 40%;
      background: ${color.gradient};
      position: absolute;
      bottom: 0;
      left: 20%;
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
  margin-top: -60.8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 0px;
  list-style: none;
  gap: 40px;

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

      svg {
        width: 25px;
        height: 25px;
      }

      &:hover {
        color: ${color.primary};
      }
    }
  }

  @media (max-width: 800px) {
    margin-top: 0;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 0;
    height: 100%;
  }
`
