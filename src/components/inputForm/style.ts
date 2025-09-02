import styled from 'styled-components'
import { color } from '../../style'

type props = {
  $status: string
}

export const InputForm = styled.div<props>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 32px;
  position: relative;

  label {
    font-size: 14px;
  }

  input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border-radius: 4px;
    border: 2px solid;
    border-color: ${({ $status }) =>
      $status === 'error'
        ? `${color.red}`
        : $status === 'success'
          ? `${color.green}`
          : `${color.border}`};

    &:focus {
      outline: none;
    }
  }

  small {
    position: absolute;
    bottom: -20px;
    font-size: 12px;
    color: ${({ $status }) =>
      $status === 'error' ? `${color.red}` : 'transparent'};
  }

  i {
    top: 55%;
    right: 10px;
    position: absolute;
    color: transparent;
  }

  .fa-circle-check {
    color: ${({ $status }) =>
      $status === 'error'
        ? `transparent`
        : $status === 'success'
          ? `${color.green}`
          : `transparent`};
  }

  .fa-circle-exclamation {
    color: ${({ $status }) =>
      $status === 'error'
        ? `${color.red}`
        : $status === 'success'
          ? `transparent`
          : `transparent`};
  }
`
