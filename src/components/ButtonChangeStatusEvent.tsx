import {useNavigate, useParams} from "react-router-dom";
import {StatusEvents} from "../types/types";
import {ContainerButtonChangeStatusEvent, Button, ButtonConfirmation} from "./styles/ContainerButtonChangeStatusEvent";
import axios from "axios";
import {useState} from "react";

interface Props {
    status: string
}

const ButtonChangeStatusEvent = () => {
    const [clickDeleteEvent, setClickDeleteEvent] = useState(false);


    const navigate = useNavigate();

    type eventParams = {
        id: string,
    }

    const {id} = useParams<eventParams>();

    const handleClickToChangeStatus = (status: number) => {
        axios.post(`${process.env.REACT_APP_BACKEND}api/admin/events/${id}/status/${status}`)
    }

    const handleClickToDeleteEvent = async () => {
        await axios.delete(`${process.env.REACT_APP_BACKEND}api/admin/events/${id}`);
        navigate(`/`);
        return;
    }

    return <>
        <ContainerButtonChangeStatusEvent>
            <p>Alterar Status Deste Evento ?</p>
            <>
                <Button status={0} onClick={() => handleClickToChangeStatus(0)}>{StatusEvents[0]}</Button>
                <Button status={1} onClick={() => handleClickToChangeStatus(1)}>{StatusEvents[1]}</Button>
                <Button status={2} onClick={() => handleClickToChangeStatus(2)}>{StatusEvents[2]}</Button>
                <Button status={3} onClick={() => setClickDeleteEvent(!clickDeleteEvent)}
                        className={!clickDeleteEvent ? "" : "hidden"}>Apagar Evento</Button>
            </>
            <div className={clickDeleteEvent ? "show" : "hidden"}>
                <p>Deseja mesmo apagar este evento?</p>
                <ButtonConfirmation status={1}
                                    onClick={() => setClickDeleteEvent(!clickDeleteEvent)}>Cancelar</ButtonConfirmation>
                <ButtonConfirmation status={2} onClick={handleClickToDeleteEvent}>Apagar</ButtonConfirmation>
            </div>
        </ContainerButtonChangeStatusEvent>
    </>
}
export default ButtonChangeStatusEvent;
