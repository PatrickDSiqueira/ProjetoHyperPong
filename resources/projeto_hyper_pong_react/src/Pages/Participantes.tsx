import Header from "../components/Header";
import {ContainerParticipantes} from "./styles/Participantes";
import React from "react";

function ButtonInscreva() {
    return null;
}

export default function Participantes(){
    return <>
        <Header  titulo={"Lista de Participantes"}/>
        <ContainerParticipantes>
            <p>Titulo</p>
            <div>
                legenda
            </div>
            <div>participantes</div>

            <ButtonInscreva></ButtonInscreva>
        </ContainerParticipantes>
    </>
}
