import React from "react";
import {ContainerButton} from "./styles/ButtonInscreva";
import {useNavigate, useParams} from "react-router-dom";


interface  Props {
    link :string
}
const ButtonInscreva = (props: Props)=>{
    const {link} = props;


    type eventParams = {
        id: string,
        idcat: string
    }

    const params = useParams<eventParams>();

    const navigate = useNavigate();
    const handleClickButtonInscricao = ()=>{
        navigate(link);
    }

    return <>
            <ContainerButton onClick={handleClickButtonInscricao}>Inscreva-se</ContainerButton>
    </>
}
export default ButtonInscreva;
