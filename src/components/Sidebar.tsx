import { BsFillCaretLeftFill as IconeClose } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Container, Content, ContinerHeader } from "./styles/Sidebar";

interface Props {
    sidebar: boolean
    active: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = (props: Props) => {
    const { sidebar, active } = props;

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
                    <p>Todos</p>
                </Link>
                <Link to={'/copas'} onClick={closeSidebar}>
                    <p>Copas Hyper</p>
                </Link>
                <Link to={'/rachoes'} onClick={closeSidebar}>
                    <p>Rachões</p>
                </Link>
                <Link to={'/contato'} onClick={closeSidebar}>
                    <p>Contato</p>
                </Link>
                <Link to={'/login'} onClick={closeSidebar}>
                    <p>Admin</p>
                </Link>
            </Content>
        </Container>
    )
}

export default Sidebar;
