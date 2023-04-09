import Header from "../components/Header";
import {ContainerParticipantes, ListaParticipante, TagParticipante} from "./styles/Participantes";
import ButtonInscreva from "../components/ButtonInscreva";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {ParticipantType} from "../types/types";
import {BsCheckCircleFill as IconCheck, BsXCircleFill as IconClose} from "react-icons/bs";
import LoadingPage from "./LoadingPage";

export default function Categoria() {

    type eventParams = {
        id: string,
        idcat: string
    }

    const params = useParams<eventParams>();
    const [participants, setParticipants] = useState<ParticipantType[]>([]);
    const [nameCategory, setNameCategory] = useState('');
    const [visibleLoading, setVisibleLoading] = useState(true)


    useEffect(() => {
        const fecthTasks = async () => {
            setVisibleLoading(true)
            const {data} = await axios.get(`${process.env.REACT_APP_BACKEND}api/admin/events/${params.id}/category/${params.idcat}/participants`);
            setParticipants(data);
        }
        fecthTasks();
        setVisibleLoading(false)
    }, [visibleLoading]);

    useEffect(() => {
        const fecthTasks = async () => {
            setVisibleLoading(true)
            const {data} = await axios.get(`${process.env.REACT_APP_BACKEND}api/admin/events/${params.id}/category/${params.idcat}/name`)
            setNameCategory(data)
        }
        fecthTasks();
        setVisibleLoading(false)
    }, [visibleLoading]);

    const handleDeleteParticipants =  async (idParticipants: string)=> {
        setVisibleLoading(true)
        const data = await axios.delete(`${process.env.REACT_APP_BACKEND}api/admin/events/${params.id}/category/${params.idcat}/participants/${idParticipants}`);
        setVisibleLoading(false)
        return;
    }

    const handleConfirmParticipants = async (idParticipants: string) => {
        setVisibleLoading(true)
        const data = await axios.post(`${process.env.REACT_APP_BACKEND}api/admin/events/${params.id}/category/${params.idcat}/participants/${idParticipants}`);
        setVisibleLoading(false)
        return;
        }

    return <>
        <Header titulo={"Lista de Participantes"}/>
        {visibleLoading && <LoadingPage/>}
        {!visibleLoading && <ContainerParticipantes>
            <h1>{nameCategory}</h1>
            <span id="containerLegenda">
                <div className="containerIcone">
                    <div id="simbAmarelo" className="icone"/><span>Aguardando</span>
                </div>
                <div className="containerIcone">
                    <div id="simbVerde" className="icone"/><span>Confirmado</span>
                </div>
            </span>
            <ListaParticipante>
                {participants?.map(participant => {
                    return <><TagParticipante status={participant.status}>{participant.nomeSobrenome}
                        <IconCheck onClick={()=>handleConfirmParticipants(participant.idParticipants)}/>
                        <IconClose onClick={()=>handleDeleteParticipants(participant.idParticipants)}/>
                    </TagParticipante>
                    </>
                })}
            </ ListaParticipante>
            <ButtonInscreva link={`/evento/${params.id}/categoria/${params.idcat}/inscricao`} />
        </ContainerParticipantes>}
    </>
}
