import React from "react";
import {ContainerButton} from "./styles/ButtonInscreva";
import {useNavigate, useParams} from "react-router-dom";


const ButtonInscreva = ()=>{


    type eventParams = {
        id: string,
        idcat: string
    }

    const params = useParams<eventParams>();

    const navigate = useNavigate();
    const handleClickButtonInscricao = ()=>{
        navigate(`/evento/${params.id}/categoria/${params.idcat}/inscricao`);
    }

    return <>
            <ContainerButton onClick={handleClickButtonInscricao}>Inscreva-se</ContainerButton>
    </>
}
export default ButtonInscreva;
