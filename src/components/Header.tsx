import { useState } from "react";
import { BsList as IconMenu } from "react-icons/bs"
import Sidebar from "./Sidebar";
import { Container } from "./styles/Header";


interface Props {
    titulo : string
}

export default function Header(props : Props) {
    const {titulo} = props
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar)
    return <Container>
        <IconMenu onClick={showSidebar} size="40"/>
        <h1>{titulo}</h1>
        {sidebar && <Sidebar active = {setSidebar} sidebar = {sidebar}/>}
    </ Container>
}