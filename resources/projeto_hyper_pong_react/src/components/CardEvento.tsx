import { ContainerCard, TituloCard } from "./styles/CardEvento";
import { BsCalendar3 as IconCalendar } from "react-icons/bs";


export enum Status {
    DISPONÍVEL,
    ENCERRADO
}
interface Props {
    bg : string
    titulo : string
    status : string
    data : Date | string
}

function CardEvento (props : Props){
    const {bg, data, titulo, status} = props;
    return<>
        <ContainerCard bg={bg} >
            <TituloCard>{titulo}</TituloCard>
            <p>{status}</p>
            <div>
            <IconCalendar />
            <p>{data.toString()}</p>
            </div>
        </ContainerCard>
    </>
}

export default CardEvento;