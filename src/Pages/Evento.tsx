import Header from "../components/Header";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import CategoriaComponent from "../components/CategoriaComponent";
import {ContainerEvento} from "./styles/Evento";
import EventType from "../types/eventType";
import axios from "axios";


export const Evento = () => {
    type eventParams = {
        id: string
    }
    const params = useParams<eventParams>();

    const [event, setEvent] = useState<EventType>()

    useEffect(() => {
        const fetchTasks = async () => {
            const {data} = await axios.get(`http://localhost:4000/api/admin/events/${params.id}`);
            setEvent(data);
        };
        fetchTasks();
    }, [])

    return <>
        <Header titulo={event?.nomeEvento}/>
        <ContainerEvento>
            <p>Data : {event?.data}</p>
            <Link to={"/"}>Mais Informações</Link>
            {event?.categoriasObj.map((category) => {
                return <CategoriaComponent category={category}/>
            })}
        </ContainerEvento>
    </>;
}
