import Header from "../components/Header";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import CategoriaComponent from "../components/CategoriaComponent";
import {ContainerEvento} from "./styles/Evento";
import axios from "axios";
import moment from "moment";
import {EventType} from "../types/types";
import ButtonChangeStatusEvent from "../components/ButtonChangeStatusEvent";
import LoadingPage from "./LoadingPage";


export const Evento = () => {
    type params = {
        id: string
    }
    const params = useParams<params>();

    const [event, setEvent] = useState<EventType>()
    const [visibleLoading, setVisibleLoading] = useState(true)

    useEffect(() => {
        const fetchTasks = async () => {
            const {data} = await axios.get(`${process.env.REACT_APP_BACKEND}api/admin/events/${params.id}`);
            setEvent(data);
            setVisibleLoading(false)
        };
        fetchTasks();
    },[])

    return <>
        <Header titulo={event?.nomeEvento}/>
        {visibleLoading && <LoadingPage/>}
        {!visibleLoading && <ContainerEvento>
            <p>{"Data : " + moment(event?.data).format("DD/MM/YY") + " ás " + event?.horario}</p>
            <Link to={`/evento/${event?.id}/informacoes`}>Mais Informações</Link>
            {event?.categoriasObj ? (event?.categoriasObj.map((category, index) => {
                return <CategoriaComponent category={category} index={index}/>
            })) : "Nenhuma categoria cadastrada :-("}
            <ButtonChangeStatusEvent/>
        </ContainerEvento>}
    </>;
}
