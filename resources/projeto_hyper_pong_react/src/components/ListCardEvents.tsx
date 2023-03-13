import { CardDesc, CardImage, ContainerCard, LabelStatusEvent, ListCard, TituloCard } from "./styles/ListCardEvents";
import { BsFillCalendarFill as IconCalendar } from "react-icons/bs";
import database from "../Database";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom";
import { Message } from "./Message";
import { useState } from "react";

function ListCardEvents() {
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate();

    const handleClickCardEvent = (eventCard: any) => {
        if (eventCard.status === "ENCERRADO") {
            setVisible(!visible);
        } else {
            navigate("/evento");
        }
    }

    return (
        <>{visible && <Message msg="Evento Encerrado !" type="error" /> }
            <ListCard>
                <ContainerCard active={1} onClick={() => handleClickCardEvent(database.CardEvento[0])}>
                    <CardImage>
                        <img src="http://rededoesporte.gov.br/pt-br/megaeventos/olimpiadas/modalidades/tenisdemesa1.jpeg/image" alt="" />
                    </CardImage>
                    <CardDesc>
                        <TituloCard>{database.CardEvento[0].titulo}</TituloCard>
                        <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                            <IconCalendar size={35} />
                            <div style={{ paddingLeft: "15px" }}>
                                <span>{(database.CardEvento[0].data)}</span>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <LabelStatusEvent color={database.CardEvento[0].status === "DISPONIVEL" ? "green" : "red"}>{database.CardEvento[0].status}</LabelStatusEvent>
                                </div>
                            </div>
                        </div>
                    </CardDesc>
                </ContainerCard>

                <ContainerCard active={0.6} onClick={() => handleClickCardEvent(database.CardEvento[1])}>
                    <CardImage>
                        <img src="http://rededoesporte.gov.br/pt-br/megaeventos/olimpiadas/modalidades/tenisdemesa1.jpeg/image" alt="" />
                    </CardImage>
                    <CardDesc>
                        <TituloCard>{database.CardEvento[1].titulo}</TituloCard>
                        <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                            <IconCalendar size={35} />
                            <div style={{ paddingLeft: "15px" }}>
                                <span>{(database.CardEvento[1].data)}</span>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <LabelStatusEvent color={database.CardEvento[1].status === "DISPONIVEL" ? "green" : "red"}>{database.CardEvento[1].status}</LabelStatusEvent>
                                </div>
                            </div>
                        </div>
                    </CardDesc>
                </ContainerCard>
            </ListCard>
            <ListCard>
                <ContainerCard active={1} onClick={() => handleClickCardEvent(database.CardEvento[0])}>
                    <CardImage>
                        <img src="http://rededoesporte.gov.br/pt-br/megaeventos/olimpiadas/modalidades/tenisdemesa1.jpeg/image" alt="" />
                    </CardImage>
                    <CardDesc>
                        <TituloCard>{database.CardEvento[0].titulo}</TituloCard>
                        <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                            <IconCalendar size={35} />
                            <div style={{ paddingLeft: "15px" }}>
                                <span>{(database.CardEvento[0].data)}</span>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <LabelStatusEvent color={database.CardEvento[0].status === "DISPONIVEL" ? "green" : "red"}>{database.CardEvento[0].status}</LabelStatusEvent>
                                </div>
                            </div>
                        </div>
                    </CardDesc>
                </ContainerCard>

                <ContainerCard active={0.6} onClick={() => handleClickCardEvent(database.CardEvento[1])}>
                    <CardImage>
                        <img src="http://rededoesporte.gov.br/pt-br/megaeventos/olimpiadas/modalidades/tenisdemesa1.jpeg/image" alt="" />
                    </CardImage>
                    <CardDesc>
                        <TituloCard>{database.CardEvento[1].titulo}</TituloCard>
                        <div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                            <IconCalendar size={35} />
                            <div style={{ paddingLeft: "15px" }}>
                                <span>{(database.CardEvento[1].data)}</span>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <LabelStatusEvent color={database.CardEvento[1].status === "DISPONIVEL" ? "green" : "red"}>{database.CardEvento[1].status}</LabelStatusEvent>
                                </div>
                            </div>
                        </div>
                    </CardDesc>
                </ContainerCard>
            </ListCard>
        </>
    );
}

export default ListCardEvents;
