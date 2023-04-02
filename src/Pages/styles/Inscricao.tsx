import styled from "styled-components";

export const ContainerPageInscricao = styled.div`
  > form {
    display: flex;
    flex-direction: column;
    border: black 1px solid;
    border-radius: 12px;
    padding: 8px;
    margin-top: 80px;
    margin-right: 30px;
    margin-left: 30px;

  > input {
    border-radius: 12px;
    border: 0.1px solid black;
    width: 300px;
  }
    > label {
      margin-top: 25px;
      margin-bottom: 10px;
    }
  }


  #dtaNascimento, #telefone, #nomeSobrenome {
    padding-left: 12px;
    height: 50px;
  }
  
  display: flex;
  justify-content: center;
  align-items: center;
`;
