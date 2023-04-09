import styled, {keyframes} from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
    direction: inherit;
  }
`;
export const ContainerLoadingPage = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(10, 88, 202, 0);

  > svg {
    animation: ${spin} 1s linear infinite;
    animation-direction: reverse;
  }
`;