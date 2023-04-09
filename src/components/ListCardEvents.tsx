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
import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment/moment";
import {EventType, StatusEvents} from "../types/types";
import LoadingPage from "../Pages/LoadingPage";


interface Props {
    filterEvents ?: string
}
function ListCardEvents({filterEvents}:Props) {
    const [eventsLista, setEventsLista] = useState<EventType[]>([])
    const [visible, setVisible] = useState(false)
    const [visibleLoading, setVisibleLoading] = useState(true)
    const navigate = useNavigate();

    const handleClickCardEvent = (statusEvent: string, eventId: string) => {
        if (statusEvent === "2") {
            setVisible(!visible);
        } else {
            navigate(`/evento/${eventId}`);
        }
    }

    useEffect(() => {
        const fetchTasks = async () => {
            const {data} = await axios.get(`${process.env.REACT_APP_BACKEND}api/admin/events`);
            setEventsLista(data)
        };
        fetchTasks();
        setVisibleLoading(false)
    }, [])


    return <>
        {visible && <Message msg="Evento Encerrado !" type="error"/>}
        {visibleLoading && <LoadingPage/>}
        {!visibleLoading && <ListCard>

                <ContainerButtonADDEvent onClick={()=>navigate("/evento/criar")}>
                    <IconPlus color={"green"} size={50}/>
                    <TituloCard>Novo Evento</TituloCard>
                </ContainerButtonADDEvent>

                {eventsLista.map((events, index) => {
                    if(filterEvents && filterEvents !== events.tipo){
                        return;
                    }
                    return <ContainerCard key={index} active={events.status === "2" ? 0.6 : 1}
                                          onClick={() => handleClickCardEvent(events.status, events.id)}>
                        <CardImage>
                            <img
                                src="http://rededoesporte.gov.br/pt-br/megaeventos/olimpiadas/modalidades/tenisdemesa1.jpeg/image"
                                alt=""/>
                        </CardImage>
                        <CardDesc>
                            <TituloCard>{events.nomeEvento}</TituloCard>
                            <div style={{display: 'flex', flexDirection: "row", alignItems: "center"}}>
                                <IconCalendar size={35}/>
                                <div style={{paddingLeft: "15px"}}>
                                    <span>{moment(events?.data).format("DD/MM/YY") + " - " + events.horario}</span>
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
