import Header from "../components/Header";
import {Link, useParams} from "react-router-dom";
import CategoriaComponent from "../components/CategoriaComponent";
import {ContainerEvento} from "../Pages/styles/Evento";
import moment from "moment";
import {GetOne} from "../hooks/Event";
import {routeParams} from "../types/types";
import ButtonShareEvent from "../components/ButtonShareEvent";

export const Evento = () => {

    const {idEvent} = useParams<routeParams>();

    const event = GetOne((idEvent));

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
        </ContainerEvento>
    </>;
}
