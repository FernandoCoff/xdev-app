import styled from 'styled-components'
import { color } from '../../style'

export const Button = styled.button`
  width: 100%;
  margin-top: 32px;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background: ${color.gradient};
  color: ${color.bgPrimary};
  font-size: 14px;
  text-transform: uppercase;
  background-size: 150%;
  background-position: left;
  transition: 0.4s;
  font-weight: 500;

  &:hover {
    background-position: right;
  }
`
