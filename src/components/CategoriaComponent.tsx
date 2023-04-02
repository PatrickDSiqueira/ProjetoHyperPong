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

const CategoriaComponent = (props : PropsComponetCategory) => {

    type eventParams = {
        id: string
    }
    const params = useParams<eventParams>();

    const {category, index} = props;
    const navigate = useNavigate();

    const [contador, setContador] = useState(0);

    useEffect(()=>{
     var size = Object.keys(category.participantes).length
        setContador(size)
    },[])


    return <>
        <ContainerCategoria onClick={() => navigate(`/evento/${params.id}/categoria/${index}`)}>
            <IconPerson size={35}/>
            <Capacidade>{contador}/{category.maxParticipante}</Capacidade>
            <TituloCategoria>{category.nome}</TituloCategoria>
            <IconPlus color={'#036537'} size={35}/>
        </ContainerCategoria>
    </>
}

export default CategoriaComponent
