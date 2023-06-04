import styled, {keyframes} from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
    direction: inherit;
  }
`;
export const ContainerLoadingPage = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;

  > svg {
    animation: ${spin} 1s linear infinite;
    animation-direction: reverse;
  }
`;