import {IconType} from "react-icons";
import {ContainerCardInfo} from "./styles/CardInfo";
import {useEffect} from "react";

interface Props {
    title: string,
    containment: string,
    Icon: React.ReactNode
}

const CardInfo = (props: Props) => {

    const {Icon, title, containment} = props;
    useEffect(()=>{
        if(containment.startsWith('"')){
            console.log(JSON.parse(containment))
        }
    })

    return <ContainerCardInfo>
        <p className="titleCardInfo">{Icon}{title}</p>
        <span style={{whiteSpace:"pre-line"}}>{containment.startsWith('"')?JSON.parse(containment):containment}</span>
    </ContainerCardInfo>
}

export default CardInfo;
