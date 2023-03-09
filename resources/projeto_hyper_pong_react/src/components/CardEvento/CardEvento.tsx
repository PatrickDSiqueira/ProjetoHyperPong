import { ContainerCard, TituloCard } from "./styles";

interface Props {
    bg : string
    titulo : string
    data : Date | string
}

function CardEvento (props : Props){
    const {bg, data, titulo} = props;
    return<>
        <ContainerCard bg={bg} >
            <TituloCard>{titulo}</TituloCard>
            <p>Disponível</p>
            <p>{data.toString()}</p>
        </ContainerCard>
    </>
}

export default CardEvento;