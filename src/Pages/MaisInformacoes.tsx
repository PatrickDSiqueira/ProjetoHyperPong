import Header from "../components/Header";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import {EventType} from "../types/types";
import {ContainerMaisInformacoesPage} from "./styles/MaisInformacoes";
import {
    BsFillClockFill as IconClock,
    BsHourglassSplit as IconEnd,
    BsPinFill as IconLocal,
    BsFillInfoCircleFill as IconInfo
} from "react-icons/bs";
import CardInfo from "../components/CardInfo";
import ButtonInscreva from "../components/ButtonInscreva";
import LoadingPage from "./LoadingPage";
import {useOneEvent} from "../hooks/useOneEvent";


export const MaisInformacoes = () => {
    type params = {
        id: string,
    }
    const params = useParams<params>();

    const [visibleLoading, setVisibleLoading] = useState(true)
    const event = useOneEvent(setVisibleLoading, params.id);

    const styleDiv = {
        display: "flex",
        width: "100%",
        justifyContent: "space-around"
    }

    return <>
        <Header titulo={event?.nomeEvento}/>
        {visibleLoading && <LoadingPage/>}
        {!visibleLoading && <ContainerMaisInformacoesPage>
            <CardInfo
                Icon={<IconLocal/>}
                title={"Local"}
                containment={event?.local ? event.local : ""}
            />
            <div style={styleDiv}>
                <CardInfo
                    Icon={<IconClock/>}
                    title={"Data"}
                    containment={moment(event?.data).format("DD/MM/YY") + " ás " + event?.horario}
                />
                <CardInfo
                    Icon={<IconEnd/>}
                    title={"inscrições Até"}
                    containment={moment(event?.prazo).format("DD/MM/YY")}
                />
            </div>
            <CardInfo
                Icon={<IconInfo/>}
                title={"Informações Adicionais"}
                containment={event?.descricao ? event.descricao : ""}
            />

            <ButtonInscreva link={`/evento/${params.id}`}/>

        </ContainerMaisInformacoesPage>}
    </>;
}
