import {useNavigate, useParams} from "react-router-dom";
import {routeParams, StatusEvents} from "../types/types";
import {ContainerButtonChangeStatusEvent, Button, ButtonConfirmation} from "./styles/ContainerButtonChangeStatusEvent";
import {useContext, useState} from "react";
import LoadingPage from "../Pages/LoadingPage";
import {database, ref, remove, update} from "../FirebaseService";
import Logs from "../hooks/Log";
import Event from "../hooks/Event";
import {AuthContext} from "../context/AuthContext";

interface Props {
    statusSelected: number
}

const ButtonChangeStatusEvent = ({statusSelected}: Props) => {

    const {userLogin} = useContext(AuthContext);

    const {idEvent} = useParams<routeParams>();
    const navigate = useNavigate();
    const eventName = Event.GetNameEvent(idEvent);

    const [clickDeleteEvent, setClickDeleteEvent] = useState(false);
    const [visibleLoading, setVisibleLoading] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState(statusSelected);

    const handleClickToChangeStatus = async (status: number) => {
        setVisibleLoading(true)
        setSelectedStatus(status)
        await update(ref(database, `events/${idEvent}`), {status: status})

            .then(() => {
                Logs.CreateLog(2, `<b>${eventName}</b> - <b>${userLogin?.email}</b> atualizou o status do evento para <b>${StatusEvents[status]}</b>.`);
                setVisibleLoading(false);
            })

            .catch(() => {
                Logs.CreateLog(3, `<b>${eventName}</b> - Erro ao <b>${userLogin?.email}</b> tentar atualizar o status para <b>${StatusEvents[status]}</b>.`);
                setVisibleLoading(false);
            });
    }

    const handleClickToDeleteEvent = async () => {
        setVisibleLoading(true)
        await remove(ref(database, `events/${idEvent}/`))

            .then(() => {
                Logs.CreateLog(2, `<b>${eventName}</b> - evento apagado por <b>${userLogin?.email}</b>.`);
            })

            .catch(() => {
                Logs.CreateLog(3, `<b>${eventName}</b> - Erro ao <b>${userLogin?.email}</b> tentar apagar .`);
            });
        navigate(`/`);

        return;
    }

    return <>
        {visibleLoading && <LoadingPage/>}
        {!visibleLoading && <ContainerButtonChangeStatusEvent>
            <p>Alterar Status Deste Evento ?</p>
            <>{StatusEvents.map((status, index) => {
                return <Button
                    className={(selectedStatus === index) ? "selection" : ""}
                    status={index}
                    onClick={() => handleClickToChangeStatus(index)}>{status}</Button>
            })}
                <Button
                    status={3}
                    onClick={() => setClickDeleteEvent(!clickDeleteEvent)}
                    className={!clickDeleteEvent ? "" : "hidden"}>Apagar Este Evento
                </Button>
            </>
            <div className={clickDeleteEvent ? "show" : "hidden"}>
                <p>Deseja mesmo apagar este evento?</p>
                <ButtonConfirmation status={2}
                    onClick={() => setClickDeleteEvent(!clickDeleteEvent)}>Cancelar</ButtonConfirmation>
                <ButtonConfirmation status={1} onClick={handleClickToDeleteEvent}>Apagar</ButtonConfirmation>
            </div>
        </ContainerButtonChangeStatusEvent>}
    </>
}
export default ButtonChangeStatusEvent;
