import { BsXLg as IconeClose } from "react-icons/bs";
import { Container, Content } from "./styles";

interface Props {
    sidebar: boolean
    active :  React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar= (props : Props) =>{
    const {sidebar, active}  = props;

    const closeSidebar = () =>{
        active(false)
    }

    return(
        <Container sidebar={sidebar}>
            <IconeClose onClick={closeSidebar} />
            <Content>
                <p>Rachão</p>
                <p>Campas</p>
                <p>Contato</p>
                <p>Número</p>
                <p></p>
            </Content>
        </Container> 
    )
} 

export default Sidebar;