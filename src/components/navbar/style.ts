import styled from 'styled-components'
import { color } from '../../style'

export const Navbar = styled.nav`
  max-width: 250px;
  height: 100dvh;
  background-color: ${color.bgPrimary};
  box-shadow: 5px 5px 10px rgba(0,0,0,.1);


  h2{
    padding-top: 24px;
    text-align: center;
    font-weight: 600;
    font-size: 24px;
    position: relative;

    &::after {
      content: '';
      height: 3px;
      width: 20%;
      background: ${color.gradient};
      position: absolute;
      bottom: 0;
      left: 35%;
      border-radius: 3px;
    }
  }
  @media(max-width: 1024px){
    max-width: 100px;

    h2{
      &::after{
        left: 10%;
        width: 50%;
      }
    }
  }
  @media(max-width: 767px){
    max-width: 100%;
    height: 80px;
    position: sticky;
    left: 0;
    top: 100%;

    h2{
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
  gap: 24px;

  li{
    width: 100%;

    button{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 16px;
      background-color: transparent;
      border: none;
      font-size: 18px;
      transition: .4s;

      @media(max-width: 1024px){
        justify-content: center;
        p{
          display: none;
        }
      }

      &:hover{
        color: ${color.primary};
      }

    }
  }

  @media(max-width: 767px){
    flex-direction: row;
  }

`
