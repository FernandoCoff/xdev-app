import styled from "styled-components";
import { color } from "../../style";

export const Home = styled.div`
  width: 100%;
  height: 100dvh;
  background: ${color.gradient};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const Main = styled.div`
  background-color: ${color.bgPrimary};
  box-shadow: 10px 10px 5px rgba(0,0,0,.1);
  width: 1000px;
  height: 100dvh;
`
