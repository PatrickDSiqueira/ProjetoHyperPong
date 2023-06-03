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
import {StatusEvents, typeMessage} from "../types/types";
import LoadingPage from "../Pages/LoadingPage";
import {AuthContext} from "../context/AuthContext";
import {useAllEvents} from "../hooks/useAllEvents";
import  image from "../images/image.jpg"
import { SelectDefault } from "./styles/Form";

interface Props {
    filterEvents ?: string
}

function ListCardEvents({filterEvents}:Props) {

    const {userLogin} = useContext(AuthContext)
    const [visibleAlertMessage, setVisibleAlertMessage] = useState(false)
    const [alertMessageText, setAlertMessageTExt] = useState('')
    const [alertMessageType, setAlertMessageType] = useState<typeMessage>("error")
    const [visibleLoading, setVisibleLoading] = useState(true)
    const navigate = useNavigate()
    const eventsList = useAllEvents(setVisibleLoading)
    const [filterStatus, setFilterStatus] = useState(3)

    const handleClickCardEvent = (statusEvent: number, eventId: string) => {
        if (statusEvent === 2 && !userLogin) {
            setAlertMessageTExt('Este evento está encerrado, experimente acessar outro evento!');
            setAlertMessageType('error');
            setVisibleAlertMessage(!visibleAlertMessage);
        } else {
            navigate(`/evento/${eventId}`);
        }
    }

    return <>
        {visibleAlertMessage && <Message msg={alertMessageText} type={alertMessageType}/>}
        {visibleLoading && <LoadingPage/>}
        {!visibleLoading &&
            <SelectDefault id="SelectFilterStatusEvent" onChange={(e) => setFilterStatus(parseInt(e.target.value))}>
                <option value="3">Todos</option>
                <option value="0">{StatusEvents[0]}</option>
                {userLogin && <option value="1">{StatusEvents[1]}</option>}
                <option value="2">{StatusEvents[2]}</option>
            </SelectDefault>
        }0
        {!visibleLoading && <ListCard>

            {userLogin && <ContainerButtonADDEvent onClick={()=>navigate("/evento/criar")}>
                    <IconPlus color={"green"} size={50}/>
                    <TituloCard>Novo Evento</TituloCard>
                </ContainerButtonADDEvent>}

            {eventsList.map((events, index) => {
                if (filterEvents && filterEvents !== events.type) {
                    return;
                }
                
                if (parseInt(events.status) === filterStatus || filterStatus === 3) {

                    return <ContainerCard key={index} active={parseInt(events.status) === 2 ? 0.6 : 1}
                        onClick={() => handleClickCardEvent(parseInt(events.status), events.id)}>
                        <CardImage>
                            <img
                                src={events.wallpaper || image}
                                alt="" />
                        </CardImage>
                        <CardDesc>
                            <TituloCard>{events.name}</TituloCard>
                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                <IconCalendar size={35} />
                                <div style={{ paddingLeft: "15px" }}>
                                    <span>{moment(events?.date).format("DD/MM/YY") + " - " + events.time}</span>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <LabelStatusEvent
                                            status={parseInt(events.status)}>{StatusEvents[parseInt(events.status)]}</LabelStatusEvent>
                                    </div>
                                </div>
                            </div>
                        </CardDesc>
                    </ContainerCard>
                }
                })}

        </ListCard>}
        </>
}

export default ListCardEvents;
