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
  
  .selection {
    color: #000000;
    border: #000000 0.5px solid;
    font-weight: bolder;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5), -2px -2px 5px rgba(0, 0, 0, 0.5);
  }
`;

export const Button = styled.button<{ status: number}>`
  background-color: ${props => (props.status === 0) ? "#198754" : (props.status === 1) ? "#727775" : (props.status === 2) ? "#ef2020" : "#f79103"};
  color: #fff;
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