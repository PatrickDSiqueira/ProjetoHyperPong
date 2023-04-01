import {CardDesc, CardImage, ContainerCard, LabelStatusEvent, ListCard, TituloCard} from "./styles/ListCardEvents";
import {BsFillCalendarFill as IconCalendar} from "react-icons/bs";
import database from "../Database";
import 'bootstrap/dist/css/bootstrap.min.css'
import {useNavigate} from "react-router-dom";
import {Message} from "./Message";
import {useEffect, useState} from "react";
import axios from "axios";
import EventType from "../types/eventType";

function ListCardEvents() {
    const [eventsLista, setEventsLista] = useState<EventType[]>([])
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate();

    const handleClickCardEvent = (statusEvent: string, eventId: string) => {
        if (statusEvent === "0") {
            navigate(`/evento/${eventId}`);
        } else {
            setVisible(!visible);
        }
    }

    useEffect(() => {
        const fetchTasks = async () => {

            const {data} = await axios.get('http://localhost:4000/api/admin/events');
            setEventsLista(data)
            console.log(data);
        };
        fetchTasks();
    }, [])


    return (
        <>{visible && <Message msg="Evento Encerrado !" type="error"/>}
            <ListCard>
                {eventsLista.map((events) => {
                    return <ContainerCard active={1} onClick={() => handleClickCardEvent(events.status, events.id)}>
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
                                    <span>{events.data}</span>
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <LabelStatusEvent
                                            color={events.status === '0' ? "green" : "red"}>{database.CardEvento[0].status}</LabelStatusEvent>
                                    </div>
                                </div>
                            </div>
                        </CardDesc>
                    </ContainerCard>
                })}
            </ListCard>
        </>
    );
}

export default ListCardEvents;
