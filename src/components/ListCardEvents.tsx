import { CardDesc, CardImage, ContainerCard, LabelStatusEvent, ListCard, TituloCard } from "./styles/ListCardEvents";
import { BsFillCalendarFill as IconCalendar } from "react-icons/bs";
import database from "../Database";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom";
import { Message } from "./Message";
import { useEffect, useState } from "react";
import axios from "axios";

function ListCardEvents() {

    interface EventosType {
        id : string,
        nomeEvento : string,
        data : string,
        horario : string,
        descricao : string,
        status : number,
        categoriasObj : object[]
    }


    const [eventosLista, setEventosLista] = useState<EventosType[]>([])
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate();

    const handleClickCardEvent = (eventCard: any) => {
        if (eventCard.status === "ENCERRADO") {
            setVisible(!visible);
        } else {
            navigate("/evento");
        }
    }

    useEffect(()=>{
        const fetchTasks = async () => {
    
          const {data} = await axios.get('http://localhost:4000/api/admin/eventos');
        //   setCategorias(categorias => [...categorias, cat])

          
          
        };
          fetchTasks();
      },[])



    return (
        <>{visible && <Message msg="Evento Encerrado !" type="error" />}

            {eventosLista}
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
            </ListCard>
        </>
    );
}

export default ListCardEvents;
