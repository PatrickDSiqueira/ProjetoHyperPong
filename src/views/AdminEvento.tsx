import React, {useState} from 'react';
import Header from "../components/Header";
import {useParams} from "react-router-dom";
import {GetOne} from "../hooks/Event";
import {routeParams} from "../types/types";
import AdminCategory from "../components/admin/AdminCategory";
import {loadingStart} from "../App";
import AdminDescricao from "../components/admin/AdminDescricao";
import LoadingPage from "./LoadingPage";

export const AdminEvento = () => {

    const {idEvent} = useParams<routeParams>();
    const [listening, setListening] = useState(0);
    const event = GetOne(idEvent, listening);

    const updateData = () => setListening(listening + 1);

    if (!event) {

        loadingStart();
        return <LoadingPage on={true}/>;
    }

    return <>
        <Header titulo={event.getName() + " - Editar"}/>
        <AdminCategory categoryList={event.getCategories()} updateData={updateData}/>
        <AdminDescricao event={event} updateData={updateData}/>
    </>;
}
