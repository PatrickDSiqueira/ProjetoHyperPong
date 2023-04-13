import styled from "styled-components";

export const ContainerPageCriarEvento = styled.div`
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