import styled from "styled-components";

export const InputDefault = styled.input`
  padding-left: 12px;
  height: 50px;
  border-radius: 12px;
  border: 0.1px solid black;
  width: 300px;
`;

export const LabelDefault = styled.label`
  margin-top: 25px;
  margin-bottom: 10px;
`;

export const FormDefault = styled.form`
  display: flex;
  flex-direction: column;
  border: black 1px solid;
  border-radius: 12px;
  padding: 8px;
  margin-top: 80px;
  margin-right: 30px;
  margin-left: 30px;
  margin-bottom: 30px;
`;

export const FormInForm = styled.form`
  display: flex;
  flex-direction: column;
  
  //padding: 8px;
  //margin-top: 80px;
  //margin-right: 30px;
  //margin-left: 30px;
  //margin-bottom: 30px;
`;

export const ContainerButtons = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 16px;
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


export const TextAreaDefault = styled.textarea`
  padding-left: 12px;
  border-radius: 12px;
  border: 0.1px solid black;
`;


export const ImageTitle = styled.img`
  width: 200px;
`;