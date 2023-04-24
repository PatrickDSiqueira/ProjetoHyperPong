import {useNavigate, useParams} from "react-router-dom";
import {routeParams, StatusEvents} from "../types/types";
import {ContainerButtonChangeStatusEvent, Button, ButtonConfirmation} from "./styles/ContainerButtonChangeStatusEvent";
import {useState} from "react";
import LoadingPage from "../Pages/LoadingPage";
import {database, ref, remove, update} from "../FirebaseService";

interface Props {
    statusSelected: number
}

const ButtonChangeStatusEvent = ({statusSelected}: Props) => {

    const {idEvent} = useParams<routeParams>();
    const navigate = useNavigate();

    const [clickDeleteEvent, setClickDeleteEvent] = useState(false);
    const [visibleLoading, setVisibleLoading] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState(statusSelected);

    const handleClickToChangeStatus = async (status: number) => {
        setVisibleLoading(true)
        setSelectedStatus(status)
        await update(ref(database, `events/${idEvent}`), {status: status}).then(() => {
            setVisibleLoading(false)
        });


    }

    const handleClickToDeleteEvent = async () => {
        setVisibleLoading(true)
        await remove(ref(database, `events/${idEvent}/`));
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
                    status={2}
                    onClick={() => setClickDeleteEvent(!clickDeleteEvent)}
                    className={!clickDeleteEvent ? "" : "hidden"}>Apagar Este Evento
                </Button>
            </>
            <div className={clickDeleteEvent ? "show" : "hidden"}>
                <p>Deseja mesmo apagar este evento?</p>
                <ButtonConfirmation status={1}
                    onClick={() => setClickDeleteEvent(!clickDeleteEvent)}>Cancelar</ButtonConfirmation>
                <ButtonConfirmation status={2} onClick={handleClickToDeleteEvent}>Apagar</ButtonConfirmation>
            </div>
        </ContainerButtonChangeStatusEvent>}
    </>
}
export default ButtonChangeStatusEvent;
