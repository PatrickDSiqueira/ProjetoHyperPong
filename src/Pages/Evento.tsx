import Header from "../components/Header";
import {Link, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import CategoriaComponent from "../components/CategoriaComponent";
import {ContainerEvento} from "./styles/Evento";
import moment from "moment";
import {EventType} from "../types/types";
import ButtonChangeStatusEvent from "../components/ButtonChangeStatusEvent";
import LoadingPage from "./LoadingPage";
import {AuthContext} from "../context/AuthContext";
import {useOneEvent} from "../hooks/useOneEvent";


export const Evento = () => {

    const {userLogin} = useContext(AuthContext);

    type params = {
        id: string
    }
    const params = useParams<params>();

    const [visibleLoading, setVisibleLoading] = useState(true)
    const event = useOneEvent(setVisibleLoading, params.id);

    return <>
        <Header titulo={event?.nomeEvento}/>
        {visibleLoading && <LoadingPage/>}
        {!visibleLoading && <ContainerEvento>
            <p>{"Data : " + moment(event?.data).format("DD/MM/YY") + " ás " + event?.horario}</p>
            <Link to={`/evento/${event?.id}/informacoes`}>Mais Informações</Link>
            {event?.categoriasObj ? (event?.categoriasObj.map((category, index) => {
                return <CategoriaComponent category={category} index={index}/>
            })) : "Nenhuma categoria cadastrada :-("}
            {userLogin && <ButtonChangeStatusEvent statusSelected={(event?.status != undefined)?parseInt(event.status):0}/>}
        </ContainerEvento>}
    </>;
}
