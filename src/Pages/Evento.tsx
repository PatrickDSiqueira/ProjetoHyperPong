import Header from "../components/Header";
import {Link, useParams} from "react-router-dom";
import {useContext, useState} from "react";
import CategoriaComponent from "../components/CategoriaComponent";
import {ContainerEvento} from "./styles/Evento";
import moment from "moment";
import ButtonChangeStatusEvent from "../components/ButtonChangeStatusEvent";
import LoadingPage from "./LoadingPage";
import {AuthContext} from "../context/AuthContext";
import Event from "../hooks/Event";
import {routeParams} from "../types/types";


export const Evento = () => {

    const {userLogin} = useContext(AuthContext);

    const {idEvent} = useParams<routeParams>();

    const [visibleLoading, setVisibleLoading] = useState(true)
    const event = Event.GetOne(setVisibleLoading, (idEvent));

    return <>
        <Header titulo={event?.name}/>
        {visibleLoading && <LoadingPage/>}
        {!visibleLoading && <ContainerEvento>
            <p>{"Data : " + moment(event?.date).format("DD/MM/YY") + " ás " + event?.time}</p>
            <Link to={`/evento/${event?.id}/informacoes`}>Mais Informações</Link>
            {
            event?.categories ? 
            (event?.categories.map((category, index) => {

                return <CategoriaComponent statusEvent={event.status} category={category} index={index}/>
            })) 
            : "Nenhuma categoria cadastrada :-("
            }
            {userLogin && <ButtonChangeStatusEvent statusSelected={(event?.status != undefined)?parseInt(event.status):0}/>}
        </ContainerEvento>}
    </>;
}
