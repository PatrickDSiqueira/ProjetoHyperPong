import Header from "../components/Header";
import database from "../Database";
import {Link} from "react-router-dom";
import React from "react";
import CategoriaComponent from "../components/CategoriaComponent";
import {ContainerEvento} from "./styles/Evento";

export const Evento  = ()=>{
    return <>
            <Header titulo={"Copa Hyper Setembro"}/>
        <ContainerEvento >
            <p>Data : {database.CardEvento["1"].data}</p>
            <Link to={"/"}>Mais Informações</Link>
            <CategoriaComponent />
            <CategoriaComponent />
            <CategoriaComponent />
            <CategoriaComponent />
        </ContainerEvento>
    </>;
}
