import React from "react";
import {ContainerButton} from "./styles/ButtonInscreva";
import {useNavigate} from "react-router-dom";


interface  Props {
    link :string
}
const ButtonInscreva = (props: Props)=>{
    const {link} = props;

    const navigate = useNavigate();
    const handleClickButtonInscricao = ()=>{
        navigate(link);
    }

    return <>
            <ContainerButton onClick={handleClickButtonInscricao}>Inscreva-se</ContainerButton>
    </>
}
export default ButtonInscreva;
