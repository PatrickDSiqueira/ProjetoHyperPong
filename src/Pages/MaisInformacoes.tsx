import Header from "../components/Header";
import {useParams} from "react-router-dom";
import React, {useState} from "react";
import moment from "moment";
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
        <Header titulo={event?.name}/>
        {visibleLoading && <LoadingPage/>}
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

            <ButtonInscreva link={`/evento/${params.id}`}/>

        </ContainerMaisInformacoesPage>}
    </>;
}
