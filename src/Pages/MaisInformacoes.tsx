import Header from "../components/Header";
import {useNavigate, useParams} from "react-router-dom";
import React from "react";
import moment from "moment";
import {ContainerMaisInformacoesPage} from "./styles/MaisInformacoes";
import {
    BsFillClockFill as IconClock,
    BsHourglassSplit as IconEnd,
    BsPinFill as IconLocal,
    BsFillInfoCircleFill as IconInfo
} from "react-icons/bs";
import CardInfo from "../components/CardInfo";
import Event from "../hooks/Event";
import {routeParams} from "../types/types";
import {ButtonInscribe} from "../components/styles/ButtonInscreva";

export const MaisInformacoes = () => {

    const {idEvent} = useParams<routeParams>();
    const navigate = useNavigate();
    const event = Event.GetOne((idEvent));

    const styleDiv = {
        display: "flex",
        width: "100%",
        justifyContent: "space-around"
    }

    return <>
        <Header titulo={event?.name}/>
        {event && <ContainerMaisInformacoesPage>
            <CardInfo
                Icon={<IconLocal/>}
                title={"Local"}
                containment={event.address ? event.address : ""}
            />
            <div style={styleDiv}>
                <CardInfo
                    Icon={<IconClock/>}
                    title={"Data"}
                    containment={moment(event.date).format("DD/MM/YY") + " ás " + event?.time}
                />
                <CardInfo
                    Icon={<IconEnd/>}
                    title={"Inscrições Até"}
                    containment={moment(event.end_date).format("DD/MM/YY")}
                />
            </div>
            <CardInfo
                Icon={<IconInfo/>}
                title={"Informações Adicionais"}
                containment={event.description ? event.description : ""}
            />

            <ButtonInscribe onClick={() => {
                navigate(`/evento/${idEvent}`)
            }}>Inscreva-se</ButtonInscribe>

        </ContainerMaisInformacoesPage>}
    </>;
}