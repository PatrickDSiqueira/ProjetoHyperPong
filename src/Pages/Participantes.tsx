import Header from "../components/Header";
import {ContainerParticipantes, ListaParticipante, TagParticipante} from "./styles/Participantes";
import React from "react";
import ButtonInscreva from "../components/ButtonInscreva";



export default function Participantes(){
    let nomeCategoria = "Categoria Absoluto";
    return <>
        <Header  titulo={"Lista de Participantes"}/>
        <ContainerParticipantes>
            <h1>{nomeCategoria}</h1>
            <span id="containerLegenda">
                <div className="containerIcone" >
                    <div id="simbAmarelo" className="icone" /><span>Aguardando</span>
                </div>
                <div className="containerIcone">
                    <div id="simbVerde" className="icone" /><span>Confirmado</span>
                </div>
            </span>
            <ListaParticipante>
                <TagParticipante statuscolor="#6AF367">Patrick Dias Siqueira</TagParticipante>
                <TagParticipante statuscolor="#F1F367">Patrick Dias Siqueira</TagParticipante>
                <TagParticipante statuscolor="#F1F367">Patrick Dias Siqueira</TagParticipante>
                <TagParticipante statuscolor="#6AF367">Patrick Dias Siqueira</TagParticipante>
                <TagParticipante statuscolor="#F1F367">Patrick Dias Siqueira</TagParticipante>
            </ ListaParticipante>
            <ButtonInscreva  />
        </ContainerParticipantes>
    </>
}
