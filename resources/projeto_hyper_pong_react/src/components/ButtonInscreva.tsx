import React from "react";
import {ContainerButton} from "./styles/ButtonInscreva";
import {useNavigate} from "react-router-dom";

const ButtonInscreva = ()=>{

    const navigate = useNavigate();
    const handleClickButtonInscricao = ()=>{
        navigate("/inscricao");
    }

    return <>
            <ContainerButton onClick={handleClickButtonInscricao}>Inscreva-se</ContainerButton>
    </>
}
export default ButtonInscreva;
