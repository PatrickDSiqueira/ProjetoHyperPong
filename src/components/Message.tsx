import { useEffect, useState } from "react";
import { ContainerMessage } from "./styles/Message";
import { typeMessage } from "../types/types";

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
        }, 3000);

        return () => clearTimeout(timer)
    }, [msg]);

    return <>{visible && (<ContainerMessage type={type}>{msg}</ContainerMessage>)}
    </>
}