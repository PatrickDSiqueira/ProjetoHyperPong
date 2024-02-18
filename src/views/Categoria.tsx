import Header from "../components/Header";
import {ContainerParticipantes, ListaParticipante, TagParticipante} from "../Pages/styles/Participantes";
import ButtonInscreva from "../components/ButtonInscreva";
import {useParams} from "react-router-dom";
import {routeParams} from "../types/types";
import {useAllParticipants} from "../hooks/useAllParticipants";
import {useNameCategory} from "../hooks/useNameCategory";

export default function Categoria() {

    const {idEvent, idCategory} = useParams<routeParams>();

    const participants = useAllParticipants(idEvent, idCategory);

    const nameCategory = useNameCategory(idEvent, idCategory);

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
                {participants?.map(({status, nomeSobrenome}, key) => {
                    return <TagParticipante key={key} status={status}>{nomeSobrenome}
                    </TagParticipante>
                })}
            </ ListaParticipante>
            <ButtonInscreva link={`/evento/${idEvent}/categoria/${idCategory}/inscricao`}/>
        </ContainerParticipantes>
    </>
}