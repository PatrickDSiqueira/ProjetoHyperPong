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
import {Message} from "./Message";
import {useContext, useState} from "react";
import moment from "moment/moment";
import {StatusEvents} from "../types/types";
import LoadingPage from "../Pages/LoadingPage";
import {AuthContext} from "../context/AuthContext";
import {useAllEvents} from "../hooks/useAllEvents";
import  image from "../images/image.jpg"


interface Props {
    filterEvents ?: string
}
function ListCardEvents({filterEvents}:Props) {


    const {userLogin} = useContext(AuthContext);
    const [visible, setVisible] = useState(false)
    const [visibleLoading, setVisibleLoading] = useState(true)
    const navigate = useNavigate();
    const eventsLista = useAllEvents(setVisibleLoading);



    const handleClickCardEvent = (statusEvent: string, eventId: string) => {
        if (statusEvent === "2") {
            setVisible(!visible);
        } else {
            navigate(`/evento/${eventId}`);
        }
    }

    return <>
        {visible && <Message msg="Evento Encerrado !" type="error"/>}
        {visibleLoading && <LoadingPage/>}
        {!visibleLoading && <ListCard>

            {userLogin && <ContainerButtonADDEvent onClick={()=>navigate("/evento/criar")}>
                    <IconPlus color={"green"} size={50}/>
                    <TituloCard>Novo Evento</TituloCard>
                </ContainerButtonADDEvent>}

                {eventsLista.map((events, index) => {
                    if (filterEvents && filterEvents !== events.type) {
                        return;
                    }
                    return <ContainerCard key={index} active={events.status === "2" ? 0.6 : 1}
                                          onClick={() => handleClickCardEvent(events.status, events.id)}>
                        <CardImage>
                            <img
                                src={image}
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
                                            color={events.status === '2' ? "red" : events.status === "0" ? "green" : "gray"}>{StatusEvents[parseInt(events.status)]}</LabelStatusEvent>
                                    </div>
                                </div>
                            </div>
                        </CardDesc>
                    </ContainerCard>
                })}

        </ListCard>}
        </>
}

export default ListCardEvents;
