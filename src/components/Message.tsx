import { useEffect, useState } from "react";
import { ContainerMessage } from "./styles/Message";

interface Props{
    type: "success" | "error",
    msg: string
} 

export const Message =  (props: Props)=>{
    const [viseble, setVisible] = useState<boolean>(true)
    const {msg, type} = props;

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

    return <>{viseble && (<ContainerMessage type={type}>{msg}</ContainerMessage>)}
    </>
}