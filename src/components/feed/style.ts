import styled from 'styled-components'
import { color } from '../../style'

export const Feed = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    margin-bottom: -80px;
  }
`

export const FeedContainer = styled.div`
  max-width: 900px;
  padding: 0 40px;
  width: 100%;
  height: 100dvh;
  @media (max-width: 1300px) {
    border: none;
  }
  @media (max-width: 767px) {
    padding: 0px;
  }
`

export const CreatePost = styled.div`
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

  form {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  textarea {
    flex: 1;
    width: 100%;
    border: none;
    resize: none;
    background-color: transparent;
    height: 20px;

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
    font-weight: 500;
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
export const PostList = styled.ul`
  list-style: none;
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

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    border: none;
    background-color: transparent;
    color: ${color.primary};
  }
`
