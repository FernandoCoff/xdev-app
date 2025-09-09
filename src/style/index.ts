import styled, { createGlobalStyle } from 'styled-components'

export const color = {
  gradient: 'linear-gradient(90deg,#4747fc,#42e0ff)',
  bgPrimary: '#fff',
  primary: '#4747fc',
  border: '#ccc',
  red: '#f14646ff',
  green: '#4cd33aff',
  gray: '#fafafa',
  gray2: '#ecececff',
  gray3: '#9b9b9bff',
}

const GlobalStyle = createGlobalStyle`
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'poppins', sans-serif;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar{
    display: none;
  }
}

button{
  cursor: pointer;
}
`
export const AuthContainer = styled.div`
  width: 100%;
  height: 100dvh;
  background: ${color.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
`
export default GlobalStyle
