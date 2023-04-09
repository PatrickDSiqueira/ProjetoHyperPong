import styled from "styled-components";

export const ContainerButtonChangeStatusEvent = styled.div`

  margin-top: 30px;
  display: flex;
  flex-direction: column;

  > .hidden {
    display: none;
  }

  > .show {
    font-size: 12px;
  }
`;

interface PropsButton {
    status: number
}

export const Button = styled.button<{ status: number }>`
  background-color: ${props => (props.status === 0) ? "#198754" : (props.status === 1) ? "#727775" : "#ef2020"};
  color: ${props => (props.status == 3) ? '#000000' : '#fff'};
  font-weight: bolder;
  padding: 10px;
  border: none;
  border-radius: 32px;
  width: 222px;
  margin-top: 12px;
  margin-bottom: 12px;
`;

export const ButtonConfirmation = styled(Button)`
    width: 111px;
`;