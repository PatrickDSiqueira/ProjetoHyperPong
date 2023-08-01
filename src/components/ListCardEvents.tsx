import {
    CardDesc,
    CardImage,
    ContainerButtonADDEvent,
    ContainerCard,
    LabelStatusEvent,
    ListCard,
    TituloCard
} from "./styles/ListCardEvents";
import {BsFillCalendarFill as IconCalendar, BsPlusLg as IconPlus} from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css'
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import moment from "moment/moment";
import {StatusEvents} from "../types/types";
import {AuthContext} from "../context/AuthContext";
import {GetAll} from "../hooks/Event";
import image from "../images/image.jpg"
import React from 'react';
import {Dropdown} from "primereact/dropdown";

interface Props {
    filterEvents?: string
}

function ListCardEvents({filterEvents}: Props) {

    const {userLogin} = useContext(AuthContext);
    const [filterStatus, setFilterStatus] = useState<"Disponível" | "Encerrado" | "Em Breve">("Disponível");
    const navigate = useNavigate();
    const eventsList = GetAll();

    const handleClickCardEvent = (eventId: string) => {

        return navigate(`/evento/${eventId}/informacoes`);
    }

    return <>
        <ListCard>

            <div className={'flex justify-center'}>
                <Dropdown value={filterStatus}
                          options={userLogin ? StatusEvents : StatusEvents.filter(item => item !== 'Encerrado')}
                          onChange={(e) => setFilterStatus(e.value)}
                          placeholder={"Selecione"}
                          showClear/>
            </div>

            {userLogin && <ContainerButtonADDEvent onClick={() => navigate("/evento/criar")}>
                <IconPlus color={"green"} size={50}/>
                <TituloCard>Novo Evento</TituloCard>
            </ContainerButtonADDEvent>}

            {eventsList.map((events, index) => {

                if (filterEvents && filterEvents !== events.type) {
                    return;
                }

                if (StatusEvents[parseInt(events.status)] === 'Encerrado' && !userLogin) {
                    return;
                }

                if (StatusEvents[parseInt(events.status)] === filterStatus || filterStatus === undefined) {

                    return <ContainerCard key={index} active={parseInt(events.status) === 2 ? 0.6 : 1}
                                          onClick={() => handleClickCardEvent(events.id)}>
                        <CardImage>
                            <img
                                src={events.wallpaper || image}
                                alt=""/>
                        </CardImage>
                        <CardDesc>
                            <TituloCard>{events.name}</TituloCard>
                            <div style={{display: 'flex', flexDirection: "row", alignItems: "center"}}>
                                <IconCalendar size={35}/>
                                <div style={{paddingLeft: "15px"}}>
                                    <span>{moment(events?.date).format("DD/MM/YY") + " - " + events.time}</span>
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <LabelStatusEvent
                                            status={parseInt(events.status)}>{StatusEvents[parseInt(events.status)]}</LabelStatusEvent>
                                    </div>
                                </div>
                            </div>
                        </CardDesc>
                    </ContainerCard>
                }

                return null;
            })}
        </ListCard>
    </>
}

export default ListCardEvents;
