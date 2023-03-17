import styled from "styled-components";

export const ContainerButtons = styled.div`
    display: flex;
    justify-content: space-around;
`;


export  const Button = styled.button`
    width: 120px;
    padding: 5px 12px 5px 12px;
    border-radius: 12px;
    border: none;
    color: white;
    font-weight: lighter;
`;

export  const ButtonSave = styled(Button)`
    background-color: green;

`;

export const ButtonCancel = styled(Button)`
  background-color: gray;
`;
