import Header from "../components/Header";
import {useNavigate, useParams} from "react-router-dom";
import React from "react";
import moment from "moment";
import {ContainerMaisInformacoesPage} from "../Pages/styles/MaisInformacoes";
import {
    BsFillClockFill as IconClock,
    BsHourglassSplit as IconEnd,
    BsPinFill as IconLocal,
    BsFillInfoCircleFill as IconInfo
} from "react-icons/bs";
import CardInfo from "../components/CardInfo";
import {GetOne} from "../hooks/Event";
import {routeParams} from "../types/types";
import {ButtonInscribe} from "../components/styles/ButtonInscreva";
import {loadingStart} from "../App";
import LoadingPage from "./LoadingPage";

export const MaisInformacoes = () => {

    const {idEvent} = useParams<routeParams>();
    const navigate = useNavigate();
    const event = GetOne((idEvent));

    const styleDiv = {
        display: "flex",
        width: "100%",
        justifyContent: "space-around"
    }

    if (!event) {

        loadingStart();
        return <LoadingPage on={true}/>;
    }

    return <>
        <Header titulo={event.getName()}/>
        <ContainerMaisInformacoesPage>
            <CardInfo
                Icon={<IconLocal/>}
                title={"Local"}
                containment={event.getAddress()}
            />
            <div style={styleDiv}>
                <CardInfo
                    Icon={<IconClock/>}
                    title={"Data"}
                    containment={moment(event.getDate()).format("DD/MM/YY") + " ás " + event.getTime()}
                />
                <CardInfo
                    Icon={<IconEnd/>}
                    title={"Inscrições Até"}
                    containment={moment(event.getEndDate()).format("DD/MM/YY")}
                />
            </div>
            <CardInfo
                Icon={<IconInfo/>}
                title={"Informações Adicionais"}
                containment={event.getDescription()}
            />

            <ButtonInscribe onClick={() => {
                navigate(`/evento/${idEvent}`)
            }}>Inscreva-se</ButtonInscribe>

        </ContainerMaisInformacoesPage>
    </>;
}