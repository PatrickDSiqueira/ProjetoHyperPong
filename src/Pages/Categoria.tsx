import Header from "../components/Header";
import {ContainerParticipantes, ListaParticipante, TagParticipante} from "./styles/Participantes";
import ButtonInscreva from "../components/ButtonInscreva";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {ParticipantType, routeParams} from "../types/types";
import {BsCheckCircleFill as IconCheck, BsXCircleFill as IconClose} from "react-icons/bs";
import LoadingPage from "./LoadingPage";
import {AuthContext} from "../context/AuthContext";
import {useAllParticipants} from "../hooks/useAllParticipants";
import {useNameCategory} from "../hooks/useNameCategory";
import {database, ref, remove, update} from "../FirebaseService";

export default function Categoria() {
    const {userLogin} = useContext(AuthContext);

    const {idEvent,idCategory}= useParams<routeParams>();

    const [visibleLoading, setVisibleLoading] = useState(true)

    const participants = useAllParticipants(setVisibleLoading, idEvent, idCategory)
    const nameCategory = useNameCategory(setVisibleLoading, idEvent, idCategory)

    const handleDeleteParticipants = async (idParticipants: string) => {
        setVisibleLoading(true)
        await remove(ref(database, `events/${idEvent}/categories/${idCategory}/participants/${idParticipants}`)).then(() => {
            setVisibleLoading(false)
        });

        return;
    }

    const handleConfirmParticipants = async (idParticipants: string) => {
        setVisibleLoading(true)
        const actualization = {status: 1};

        await update(ref(database, `events/${idEvent}/categories/${idCategory}/participants/${idParticipants}`), actualization).then(() => {
            setVisibleLoading(false)
        });
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
                        {userLogin && <div id="icones">
                            <IconCheck size={20} onClick={() => handleConfirmParticipants(participant.idParticipants)}/>
                            <IconClose size={20} onClick={() => handleDeleteParticipants(participant.idParticipants)}/>
                        </div>}
                    </TagParticipante>
                    </>
                })}
            </ ListaParticipante>
            <ButtonInscreva link={`/evento/${idEvent}/categoria/${idCategory}/inscricao`}/>
        </ContainerParticipantes>}
    </>
}
