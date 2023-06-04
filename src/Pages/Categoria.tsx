import Header from "../components/Header";
import {ContainerParticipantes, ListaParticipante, TagParticipante} from "./styles/Participantes";
import ButtonInscreva from "../components/ButtonInscreva";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ParticipantType, routeParams} from "../types/types";
import {AuthContext} from "../context/AuthContext";
import {useAllParticipants} from "../hooks/useAllParticipants";
import {useNameCategory} from "../hooks/useNameCategory";
import {FooterEdit} from "../components/FooterEdit";

export default function Categoria() {
    const {userLogin} = useContext(AuthContext);

    const {idEvent, idCategory} = useParams<routeParams>();

    const [onEdit, setOnEdit] = useState(false);
    const [participantEdit, setParticipantEdit] = useState<ParticipantType>();

    const participants = useAllParticipants(idEvent, idCategory);
    const nameCategory = useNameCategory(idEvent, idCategory);

    const editParticipant = (participant: ParticipantType) => {
        setOnEdit(!onEdit);
        setParticipantEdit(participant);
    }

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
                {participants?.map((participant, key) => {
                    return <TagParticipante key={key} onClick={() => editParticipant(participant)}
                                            status={participant.status}>{participant.nomeSobrenome}
                    </TagParticipante>
                })}
            </ ListaParticipante>
            <ButtonInscreva link={`/evento/${idEvent}/categoria/${idCategory}/inscricao`}/>
        </ContainerParticipantes>
        {onEdit && userLogin && <FooterEdit participant={participantEdit} setVisible={setOnEdit}/>}
    </>
}