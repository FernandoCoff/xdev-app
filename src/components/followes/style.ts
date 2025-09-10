import styled from 'styled-components'
import { color } from '../../style'

export const Container = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Search = styled.div`
  max-width: 900px;
  padding: 0 40px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1300px) {
    border: none;
  }
  @media (max-width: 767px) {
    padding: 0px;
  }
`

export const Input = styled.div`
  padding: 16px;
  border-radius: 16px 16px 0px 0px;
  border: 1px solid ${color.border};
  background-color: ${color.gray};
  position: relative;
  @media (max-width: 767px) {
    border-radius: 0px;
  }

  input {
    width: 100%;
    background-color: transparent;
    border: 1px solid ${color.border};
    border-radius: 8px;
    font-size: 16px;
    padding: 8px 40px;

    &:focus {
      outline: none;
    }
  }

  svg {
    position: absolute;
    top: 35%;
    left: 32px;
    width: 20px;
    height: 20px;
  }
`

export const Control = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 0;

  h2 {
    font-size: 16px;
    width: 100%;
    text-align: center;
    font-weight: 600;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: ${color.primary};
    font-size: 30px;

    @media (max-width: 767px) {
      display: none;
    }
  }
`
export const UserList = styled.ul`
  list-style: none;
  width: 100%;
  height: 100%;
  overflow: scroll;
`
export const Info = styled.li`
  width: 100%;
  text-align: center;
  padding: 16px;
  background-color: ${color.gray};
  border: 1px solid ${color.border};
  border-top: none;
`
