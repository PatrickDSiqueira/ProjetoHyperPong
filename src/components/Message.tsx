import { useEffect, useState } from "react";
import { ContainerMessage } from "./styles/Message";
import { typeMessage } from "../types/types";
import { GrFormClose as IconClose} from "react-icons/gr";

interface Props{
    type: typeMessage,
    msg: string,
} 

export const Message =  ({msg, type}: Props)=>{
    const [visible, setVisible] = useState<boolean>(true)

    useEffect(()=>{
        if(!msg){
            setVisible(false)
            return
        }
        setVisible(true)
        const timer = setTimeout(() => {
            setVisible(false)
        }, 7000);

        return () => clearTimeout(timer)
    }, [msg]);

    return <>{visible &&(<ContainerMessage type={type} >{msg} <IconClose onClick={()=>setVisible(false)} style={{cursor: "pointer"}}>x</IconClose></ContainerMessage>)}
    </>
}