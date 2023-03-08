import { useState } from "react";
import { BsList as IconMenu } from "react-icons/bs"
import Sidebar from "../sidebar/Sidebar";
import { Container } from "./styles";




export default function Header() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar)
    return <Container>
        <IconMenu onClick={showSidebar} />
        {sidebar && <Sidebar active = {setSidebar} sidebar = {sidebar}/>}
    </ Container>
}