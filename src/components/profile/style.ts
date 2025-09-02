import styled from 'styled-components'
import { color } from '../../style'

export const Profile = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;

  form {
    width: 50%;

    h2 {
      text-align: center;
      font-weight: 600;
      font-size: 24px;
      position: relative;
      text-transform: uppercase;

      &::after {
        content: '';
        height: 3px;
        width: 30%;
        background: ${color.gradient};
        position: absolute;
        bottom: 0;
        left: 32.5%;
        border-radius: 3px;
      }
    }
  }

  @media (max-width: 1024px) {
    gap: 24px;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    height: 100%;

    form {
      width: 100%;
      height: 100%;

      h2::after {
        left: 35%;
      }
    }
  }
`

export const ProfileImage = styled.div`
  div {
    position: relative;
    max-width: 400px;
    max-height: 400px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      button {
        background-color: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        color: ${color.bgPrimary};
      }
    }
  }

  p {
    width: 100%;
    text-align: center;
    margin-top: 24px;
    font-size: 14px;
  }

  button {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: transparent;
    color: transparent;
    text-transform: uppercase;
    border: none;
    font-size: 16px;
    transition: 0.3s;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1024px) {
    div {
      max-width: 300px;
      max-height: 300px;
    }
  }

  @media (max-width: 767px) {
    p {
      display: none;
    }

    div {
      max-width: 200px;
      max-height: 200px;
    }
  }
`
