import {BsFillPersonFill as IconPerson} from "react-icons/bs";
import {AiFillPlusCircle as IconPlus} from "react-icons/ai";
import {Capacidade, ContainerCategoria, TituloCategoria} from "./styles/CategoriaComponent";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import {PropsComponetCategory, routeParams, typeMessage} from "../types/types";
import {AuthContext} from "../context/AuthContext";
import { Message } from "./Message";

const CategoriaComponent = ({category, index, statusEvent}: PropsComponetCategory) => {

    const {idEvent} = useParams<routeParams>();

    const navigate = useNavigate();

    const [counter, setCounter] = useState(0);

    const [visibleMessage, setVisibleMessage] = useState(false);
    const [alertMessageText, setAlertMessageText] = useState('')
    const [alertMessageType, setAlertMessageType] = useState<typeMessage>("error")

    const { userLogin } = useContext(AuthContext);

    useEffect(() => {
        if (category.participants === undefined || category.participants === null) {
            setCounter(0)
        } else {
            var filtrado = Object.values(category.participants).filter(obj => obj.status == "1");
            setCounter(filtrado.length)
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisibleMessage(false)
        }, 3000);

        return () => clearTimeout(timer)
    });

    const handleClickCategory = () => {
        if (statusEvent == "3" && !userLogin) {
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
            <Capacidade>{counter}/{category.maxParticipants}</Capacidade>
            <TituloCategoria>{category.name}</TituloCategoria>
            <IconPlus color={'#036537'} size={35}/>
        </ContainerCategoria>
    </>
}

export default CategoriaComponent
