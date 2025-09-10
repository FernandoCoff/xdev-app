import styled from 'styled-components'
import { color } from '../../style'

export const Container = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    margin-bottom: -80px;
  }
`
export const PostContainer = styled.div`
  max-width: 900px;
  padding: 0 40px;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;

  @media (max-width: 1300px) {
    border: none;
  }
  @media (max-width: 767px) {
    padding: 0px;
  }
`
export const Picture = styled.div`
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

export const Post = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  background-color: ${color.gray};
  padding: 16px;
  border-radius: 16px 16px 0px 0px;
  border: 1px solid ${color.border};
  @media (max-width: 767px) {
    border-radius: 0px;
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
export const Coment = styled.div`
  padding: 16px;
  background-color: ${color.gray};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border: 1px solid ${color.border};
  border-top: none;
  @media (max-width: 800px) {
    margin-bottom: 80px;
  }

  textarea {
    border: none;
    background-color: transparent;
    font-size: 16px;
    resize: none;
    height: 20px;
    width: 100%;
    flex: 1;

    &:focus {
      outline: none;
    }
  }

  button {
    background: ${color.gray2};
    border: none;
    font-size: 14px;
    background-size: 200%;
    background-position: left;
    padding: 8px 16px;
    border: 1px solid ${color.border};
    border-radius: 8px;
    transition: 0.4s;
    font-weight: 500;
  }
`
export const ListComment = styled.ul`
  list-style: none;
  max-height: 100%;
  overflow: scroll;
`
