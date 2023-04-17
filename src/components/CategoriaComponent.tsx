import {BsFillPersonFill as IconPerson} from "react-icons/bs";
import {AiFillPlusCircle as IconPlus} from "react-icons/ai";
import {Capacidade, ContainerCategoria, TituloCategoria} from "./styles/CategoriaComponent";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {PropsComponetCategory, routeParams} from "../types/types";

const CategoriaComponent = ({category, index}: PropsComponetCategory) => {

    const {idEvent} = useParams<routeParams>();

    const navigate = useNavigate();

    const [counter, setCounter] = useState(0);

    useEffect(()=>{
        if (category.participants === undefined || category.participants === null) {
            setCounter(0)
        } else {
            var filtrado = Object.values(category.participants).filter(obj => obj.status == "1");
            setCounter(filtrado.length)
        }
    },[])


    return <>
        <ContainerCategoria onClick={() => navigate(`/evento/${idEvent}/categoria/${index}`)}>
            <IconPerson size={35}/>
            <Capacidade>{counter}/{category.maxParticipants}</Capacidade>
            <TituloCategoria>{category.name}</TituloCategoria>
            <IconPlus color={'#036537'} size={35}/>
        </ContainerCategoria>
    </>
}

export default CategoriaComponent
