import Header from "../components/Header";
import {Link, useParams} from "react-router-dom";
import {useContext} from "react";
import CategoriaComponent from "../components/CategoriaComponent";
import {ContainerEvento} from "./styles/Evento";
import moment from "moment";
import ButtonChangeStatusEvent from "../components/ButtonChangeStatusEvent";
import {AuthContext} from "../context/AuthContext";
import Event from "../hooks/Event";
import {routeParams} from "../types/types";
import ButtonShareEvent from "../components/ButtonShareEvent";


export const Evento = () => {

    const {userLogin} = useContext(AuthContext);
    const {idEvent} = useParams<routeParams>();
    const event = Event.GetOne((idEvent));

    return <>
        <Header titulo={event?.name}/>
        <ContainerEvento>
            <p>{"Data : " + moment(event?.date).format("DD/MM/YY") + " ás " + event?.time}</p>
            <Link to={`/evento/${event?.id}/informacoes`}>Mais Informações</Link>
            {
                event?.categories ?
                    (event?.categories.map((category, index) => {

                        return <CategoriaComponent key={index} statusEvent={event.status} category={category}
                                                   index={index}/>
                    }))
                    : "Nenhuma categoria cadastrada :-("
            }
            <ButtonShareEvent/>
            {userLogin &&
                <ButtonChangeStatusEvent statusSelected={(event?.status !== undefined) ? parseInt(event.status) : 0}/>}
        </ContainerEvento>
    </>;
}
