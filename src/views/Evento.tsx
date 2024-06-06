import Header from "../components/Header";
import {Link, useParams} from "react-router-dom";
import CategoriaComponent from "../components/CategoriaComponent";
import {ContainerEvento} from "../Pages/styles/Evento";
import moment from "moment";
import {GetOne} from "../hooks/Event";
import {routeParams} from "../types/types";
import ButtonShareEvent from "../components/ButtonShareEvent";
import {loadingStart} from "../App";
import LoadingPage from "./LoadingPage";
import React from "react";

export const Evento = () => {

    const {idEvent} = useParams<routeParams>();

    const event = GetOne(idEvent);

    if (!event) {

        loadingStart();
        return <LoadingPage on={true}/>;
    }

    return <>
        <Header titulo={event.getName()}/>
        <ContainerEvento>
            <p>{"Data : " + moment(event.getDate()).format("DD/MM/YY") + " ás " + moment(event.getTime())}</p>
            <Link to={`/evento/${event.getId()}/informacoes`}>Mais Informações</Link>
            {event !== undefined && event.getCategories().map((category, index) => {

                        return <CategoriaComponent statusEvent={event.getStatus()} category={category}
                                                   index={index}/>
                    })
            }
            <ButtonShareEvent/>
        </ContainerEvento>
    </>;
}
