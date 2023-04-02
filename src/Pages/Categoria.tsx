import Header from "../components/Header";
import {ContainerParticipantes, ListaParticipante, TagParticipante} from "./styles/Participantes";
import ButtonInscreva from "../components/ButtonInscreva";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {ParticipantType} from "../types/types";


export default function Categoria() {

    type eventParams = {
        id: string,
        idcat: string
    }

    const params = useParams<eventParams>();
    const [participants, setParticipants] = useState<ParticipantType[]>([]);
    const [nameCategory, setNameCategory] = useState('');

    useEffect(() => {
        const fecthTasks = async () => {
            const {data} = await axios.get(`http://localhost:4000/api/admin/events/${params.id}/category/${params.idcat}/participants`);
            setParticipants(data);
        }
        fecthTasks();
    },[]);

    useEffect(() => {
        const fecthTasks = async () => {
            const {data} = await axios.get(`http://localhost:4000/api/admin/events/${params.id}/category/${params.idcat}/name`)
            setNameCategory(data)
        }
        fecthTasks();
    },[]);


return <>
    <Header titulo={"Lista de Participantes"}/>
    <ContainerParticipantes>
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
                return <TagParticipante status={participant.status}>{participant.nomeSobrenome}</TagParticipante>
            })}
        </ ListaParticipante>
        <ButtonInscreva/>
    </ContainerParticipantes>
</>
}
