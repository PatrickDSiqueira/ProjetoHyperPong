import {BsFillPersonFill as IconPerson} from "react-icons/bs";
import {AiFillPlusCircle as IconPlus} from "react-icons/ai";
import {Capacidade, ContainerCategoria, TituloCategoria} from "./styles/CategoriaComponent";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {routeParams, typeMessage} from "../types/types";
import { Message } from "./Message";
import {GetCurrentUser} from "../context/AuthContext";
import {Category} from "../types/Category";

export interface Props {
    category: Category,
    index: number,
    statusEvent: number
}

const CategoriaComponent = ({category, index, statusEvent}: Props) => {

    const {idEvent} = useParams<routeParams>();

    const navigate = useNavigate();

    const [counter, setCounter] = useState(0);

    const [visibleMessage, setVisibleMessage] = useState(false);
    const [alertMessageText, setAlertMessageText] = useState('')
    const [alertMessageType, setAlertMessageType] = useState<typeMessage>("error")

    const userLogin = GetCurrentUser();

    useEffect(() => {


        // eslint-disable-next-line
        setCounter(Object.values(category.getParticipants()).filter(obj => obj.status == '1').length)

    }, [category]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisibleMessage(false)
            
        }, 3000);

        return () => clearTimeout(timer)
    },[]);

    const handleClickCategory = () => {
        if (statusEvent === 3 && !userLogin) {
            setAlertMessageText("As inscrições para este evento não estão abertas neste momento!");
            setAlertMessageType('Observation');

            setVisibleMessage(true)

            return;
        }
        navigate(`/evento/${idEvent}/categoria/${index}`)
    }


    return <>
        {visibleMessage && <Message msg={alertMessageText} type={alertMessageType} />}

        <ContainerCategoria onClick={handleClickCategory}>
            <IconPerson size={35}/>
            <Capacidade>{counter}/{category.getMaxParticipant()}</Capacidade>
            <TituloCategoria>{category.getName()}</TituloCategoria>
            <IconPlus color={'#036537'} size={35}/>
        </ContainerCategoria>
    </>
}

export default CategoriaComponent
