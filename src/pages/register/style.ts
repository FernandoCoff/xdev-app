import styled from 'styled-components'
import { color } from '../../style'

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    text-transform: uppercase;
    font-size: 24px;
    position: relative;
    font-weight: 600;

    &::after {
      content: '';
      height: 3px;
      width: 60%;
      background: ${color.gradient};
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 3px;
    }
  }

  p {
    font-size: 12px;

    a {
      color: ${color.primary};
      text-decoration: none;
    }
  }
`
export const error = styled.p`
  font-size: 12px;
  width: 100%;
  text-align: center;
  color: ${color.red};
  margin-top: 8px;
`
