import {ContainerCardInfo} from "./styles/CardInfo";
import parse from 'html-react-parser';

interface Props {
    title: string,
    containment: string,
    Icon: React.ReactNode
}

const CardInfo = (props: Props) => {

    const {Icon, title, containment} = props;

    return <ContainerCardInfo>
        <p className="titleCardInfo">{Icon}{title}</p>
        <span style={{whiteSpace:"pre-line"}}>{parse(containment.startsWith('"')?JSON.parse(containment):containment)}</span>
    </ContainerCardInfo>
}

export default CardInfo;
