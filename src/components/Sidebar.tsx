import { BsFillCaretLeftFill as IconeClose } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Container, Content, ContinerHeader } from "./styles/Sidebar";
import { useLocation } from 'react-router-dom';

interface Props {
    sidebar: boolean
    active: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = (props: Props) => {
    const { sidebar, active } = props;
    const location = useLocation();

    const closeSidebar = () => {
        active(false)
    }

    return (
        <Container sidebar={sidebar}>
            <ContinerHeader>
            <IconeClose onClick={closeSidebar} size="30" />
            <h1>Menu</h1>
            </ContinerHeader>
            <Content>
                <Link to={'/todos'} onClick={closeSidebar}>
                    <p className= {location.pathname === '/todos' || location.pathname === '/'?  "current" : ""}>Todos</p>
                </Link>
                <Link to={'/copas'} onClick={closeSidebar}>
                    <p className= {location.pathname === '/copas'?  "current" : ""} >Copas Hyper</p>
                </Link>
                <Link to={'/rachoes'} onClick={closeSidebar}>
                    <p className= {location.pathname === '/rachoes'?  "current" : ""} >Rachões</p>
                </Link>
                <Link to={'/contato'} onClick={closeSidebar}>
                    <p className= {location.pathname === '/contato'?  "current" : ""} >Contato</p>
                </Link>
                <Link to={'/login'} onClick={closeSidebar}>
                    <p className= {location.pathname === '/login'?  "current" : ""} >Admin</p>
                </Link>
            </Content>
        </Container>
    )
}

export default Sidebar;
