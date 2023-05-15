import React from "react";
import { ContainerButtonVoltar } from "./styles/ButtonVoltar";
import { useNavigate } from "react-router-dom";



const ButtonVoltar = ()=> {
    
    const navigate = useNavigate();
    const handleClickButtonVoltar = () => {
        navigate("/");
    }

    return <>
            <ContainerButtonVoltar onClick={handleClickButtonVoltar}>Voltar para o início</ContainerButtonVoltar>
    </>
}
export default ButtonVoltar;


