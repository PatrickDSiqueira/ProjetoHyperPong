import React, {useState} from 'react';
import Header from "../components/Header";
import {useParams} from "react-router-dom";
import {GetOne} from "../hooks/Event";
import {routeParams} from "../types/types";
import Category from "../components/admin/Category";
import {loadingStart} from "../App";
import Descricao from "../components/admin/Descricao";

export const AdminEvento = () => {

    const {idEvent} = useParams<routeParams>();
    const [listening, setListening] = useState(0);
    const event = GetOne(idEvent, listening);

    const updateData = () => setListening(listening + 1);

    if (!event) {

        loadingStart();
        return <p>Obtendo dados</p>
    }

    return <>
        <Header titulo={event.name + " - Editar"}/>
        <Category categoryList={event.categories} updateData={updateData}/>
        <Descricao event={event} updateData={updateData}/>
    </>;
}
