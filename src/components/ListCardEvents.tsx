import {
    CardDesc,
    CardImage,
    ContainerCard,
    LabelStatusEvent,
    ListCard,
    TituloCard
} from "./styles/ListCardEvents";
import {BsFillCalendarFill as IconCalendar} from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css'
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import moment from "moment/moment";
import {StatusEvents} from "../types/types";
import {GetAll} from "../hooks/Event";
import React from 'react';
import {Button} from "primereact/button";
import {BsFilterSquare} from "react-icons/bs";
import {Dialog} from "primereact/dialog";
import CheckBoxFilter from "./CheckBoxFilter";
import {useFilterEvents} from "../hooks/useFilterEvents";

function ListCardEvents() {

    const [filterStatus, setFilterStatus] = useState([0, 2]);
    const [showFilter, setShowFilter] = useState(false);
    const [loading, setLoading] = useState(0);
    const eventsList = GetAll();
    const navigate = useNavigate();
    const filterEvents = useFilterEvents(loading);

    const handleClickCardEvent = (eventId: string|null) => navigate(`/evento/${eventId}/informacoes`);

    const handleClickStatus = (value: number) => {

        if (filterStatus.includes(value)) {

            setFilterStatus(filterStatus.filter(item => item !== value));

        } else {

            setFilterStatus(prevArray => [...prevArray, value]);
        }
    }

    return <>
        <ListCard>
            <div>
                <Button severity="info" className="p-button-sm" style={{margin: 10}} outlined icon={<BsFilterSquare/>}
                        onClick={() => setShowFilter(true)}/>
                <Button severity="info" className="p-button-sm" style={{margin: 10}}
                        outlined={!filterStatus.includes(0)} label={StatusEvents[0]}
                        onClick={() => handleClickStatus(0)}/>
                <Button severity="info" className="p-button-sm" style={{margin: 10}}
                        outlined={!filterStatus.includes(2)} label={StatusEvents[2]}
                        onClick={() => handleClickStatus(2)}/>
            </div>

            {eventsList.map((event, index) => {

                if (filterEvents.includes(event.getType().toString()) && filterStatus.includes(event.getStatus())) {

                    return <ContainerCard key={index} active={event.getStatus() === 2 ? 0.6 : 1}
                                          onClick={() => handleClickCardEvent(event.getId())}>
                        <CardImage>
                            <img src={event.getWallpaper()} alt=""/>
                        </CardImage>
                        <CardDesc>
                            <TituloCard>{event.getName()}</TituloCard>
                            <div style={{display: 'flex', flexDirection: "row", alignItems: "center"}}>
                                <IconCalendar size={35}/>
                                <div style={{paddingLeft: "15px"}}>
                                    <span>{moment(event.getDate()).format("DD/MM/YY") + " - " + event.getTime()}</span>
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <LabelStatusEvent
                                            status={event.getStatus()}>{event.getStatusLabel()}</LabelStatusEvent>
                                    </div>
                                </div>
                            </div>
                        </CardDesc>
                    </ContainerCard>
                }

                return null;
            })}

            <Dialog
                header="Filtros"
                visible={showFilter}
                style={{width: '50vw'}}
                onHide={() => setShowFilter(false)}
                modal
                dismissableMask={true}>
                {['0', '1'].map((filter, i) => <CheckBoxFilter key={i} value={filter} setListeningFather={setLoading}/>)}
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <div>
                        <Button severity="info" onClick={() => setShowFilter(false)}>Ok</Button>
                    </div>
                </div>
            </Dialog>
        </ListCard>
    </>
}

export default ListCardEvents;
