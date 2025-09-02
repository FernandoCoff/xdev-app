import styled from 'styled-components'
import { color } from '../../style'

export const Follow = styled.div`
  max-width: 250px;
  width: 100%;
  height: 100dvh;
  background-color: ${color.primary};

  @media (max-width: 1300px) {
    display: none;
  }
`
