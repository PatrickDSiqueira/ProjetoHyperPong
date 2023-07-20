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
import Event from "../hooks/Event";
import image from "../images/image.jpg"
import {SelectDefault} from "./styles/Form";

interface Props {
    filterEvents?: string
}

function ListCardEvents({filterEvents}: Props) {

    const {userLogin} = useContext(AuthContext);
    const [filterStatus, setFilterStatus] = useState(3);
    const navigate = useNavigate();
    const eventsList = Event.GetAll();

    const handleClickCardEvent = (eventId: string) => {

        return navigate(`/evento/${eventId}/informacoes`);
    }

    return <>

        <SelectDefault id="SelectFilterStatusEvent" onChange={(e) => setFilterStatus(parseInt(e.target.value))}>
            <option value="3">Todos</option>
            <option value="0">{StatusEvents[0]}</option>
            {userLogin && <option value="1">{StatusEvents[1]}</option>}
            <option value="2">{StatusEvents[2]}</option>
        </SelectDefault>
        <ListCard>

            {userLogin && <ContainerButtonADDEvent onClick={() => navigate("/evento/criar")}>
                <IconPlus color={"green"} size={50}/>
                <TituloCard>Novo Evento</TituloCard>
            </ContainerButtonADDEvent>}

            {eventsList.map((events, index) => {

                if (filterEvents && filterEvents !== events.type) {
                    return;
                }

                if (parseInt(events.status) === 1 && !userLogin) {
                    return;
                }

                if (parseInt(events.status) === filterStatus || filterStatus === 3) {

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
            })}
        </ListCard>
    </>
}

export default ListCardEvents;
