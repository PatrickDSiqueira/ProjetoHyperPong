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
            <>
                <Button className={(selectedStatus === 0) ? "selection" : ""} status={0}
                        onClick={() => handleClickToChangeStatus(0)}>{StatusEvents[0]}</Button>
                <Button className={(selectedStatus === 1) ? "selection" : ""} status={1}
                        onClick={() => handleClickToChangeStatus(1)}>{StatusEvents[1]}</Button>
                <Button className={(selectedStatus === 2) ? "selection" : ""} status={2}
                        onClick={() => handleClickToChangeStatus(2)}>{StatusEvents[2]}</Button>
                <Button status={3} onClick={() => setClickDeleteEvent(!clickDeleteEvent)}
                        className={!clickDeleteEvent ? "" : "hidden"}>Apagar Evento</Button>
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
