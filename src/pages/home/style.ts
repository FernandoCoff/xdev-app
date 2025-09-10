import styled from 'styled-components'
import { color } from '../../style'

export const Home = styled.div`
  max-width: 100%;
  height: 100dvh;
  background: ${color.gray};
  position: relative;
  display: flex;
  justify-content: space-between;

  @media (max-width: 767px) {
    flex-direction: column;
    height: 100%;
  }
`
export const Main = styled.div`
  background-color: ${color.bgPrimary};
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1300px) {
    max-width: 100%;
  }
  @media (max-width: 767px) {
    padding-bottom: 80px;
  }
`
