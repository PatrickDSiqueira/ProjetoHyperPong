import {BsFillPersonFill as IconPerson} from "react-icons/bs";
import {AiFillPlusCircle as IconPlus} from "react-icons/ai";
import {Capacidade, ContainerCategoria, TituloCategoria} from "./styles/CategoriaComponent";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CategoryType} from "../types/types";


interface PropsComponetCategory {
    category: CategoryType,
    index: number
}

const CategoriaComponent = ({category, index}: PropsComponetCategory) => {


    type eventParams = {
        id: string
    }
    const params = useParams<eventParams>();

    const navigate = useNavigate();

    const [counter, setCounter] = useState(0);

    useEffect(()=>{
        if (category.participants === undefined || category.participants === null) {
            setCounter(0)
        } else {
            const size = Object.keys(category.participants).length
            setCounter(size)
        }
    },[])


    return <>
        <ContainerCategoria onClick={() => navigate(`/evento/${params.id}/categoria/${index}`)}>
            <IconPerson size={35}/>
            <Capacidade>{counter}/{category.maxParticipants}</Capacidade>
            <TituloCategoria>{category.name}</TituloCategoria>
            <IconPlus color={'#036537'} size={35}/>
        </ContainerCategoria>
    </>
}

export default CategoriaComponent
