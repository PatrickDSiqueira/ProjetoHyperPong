import styled from "styled-components";

export const ContainerPageCriarEvento = styled.div`
      > form {
    display: flex;
    flex-direction: column;
    border: black 1px solid;
    border-radius: 12px;
    padding: 8px;
    margin-top: 80px;
    margin-right: 30px;
    margin-left: 30px;
    margin-bottom: 30px;

  > input {
    padding-left: 12px;
    height: 50px;
    border-radius: 12px;
    border: 0.1px solid black;
    width: 300px;
  }

    > label {
      margin-top: 25px;
      margin-bottom: 10px;
    }

  }


  /* #inputDtaNascimento, #inputTelefone, #inputNomeSobrenome {
    padding-left: 12px;
    height: 50px;
  } */
  
  display: flex;
  justify-content: center;
  align-items: center;

  .hidden{
    display: none;
  }
  
  .labelCategoria {
    background-color: #787878;
    /* padding: 5px; */
    padding-left: 12px;
    padding-right: 12px;
    width: max-content;
    border-radius: 23px;
    margin-bottom: 12px;
  }

  .deleteCategorias{
    margin-left:12px;
  }
  `;