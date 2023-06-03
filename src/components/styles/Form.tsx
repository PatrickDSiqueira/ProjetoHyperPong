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

interface PropsLabelImageDefault {
    hasFile:boolean
}
export const LabelImageDefault = styled(LabelDefault)<PropsLabelImageDefault>`
  display: flex;
  justify-content: center;
  background-color: ${props=>(!props.hasFile)?"#3498db":"#fff"};
  border-radius: 5px;
  color: ${props =>!props.hasFile?"#fff":"#3498db"};
  border: 1px dashed #3498db ;
  cursor: pointer;
  margin: 10px;
  padding: 6px 20px;


  //background-color: ${props => (props.hasFile)?"#F1F367":""};

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

export const ButtonCategories = styled(Button)`
  width: 250px;
  padding: 5px 12px 5px 12px;
  border-radius: 12px;
  border: none;
  color: white;
  font-weight: lighter;
  background-color: blue;
  display: flex;
  align-self: center;
  justify-content: center;
`;

export const TextAreaDefault = styled.textarea`
  padding-left: 12px;
  border-radius: 12px;
  border: 0.1px solid black;
`;

export const ImageTitle = styled.img`
  width: 200px;
`;

export const ContactContainer = styled.div`
  display: flex;
  align-Items: center; 
  flex-direction: column; 
  margin-top: 45px;
  max-width: 600px;
  border-radius: 15px;
  padding: 0px 15px 15px 15px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
              rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
              rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  background: #1A202C;

  h1 {
    margin-top: 45px;
    color: aliceblue;
  }
  
  #mensagem {
    margin-top: 45px;
    outline: none;
    border: 0;
    transition: all 0.5s;
  }
 
  p {
    color: aliceblue;
 }
`;

export const SelectDefault = styled.select`
  margin: 15px 50px;
  border-radius: 4px;
`;