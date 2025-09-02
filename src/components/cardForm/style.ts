import styled from 'styled-components'
import { color } from '../../style'

export const CardForm = styled.div`
  background-color: ${color.bgPrimary};
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  min-width: 400px;

  @media (max-width: 500px) {
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
  }
`
