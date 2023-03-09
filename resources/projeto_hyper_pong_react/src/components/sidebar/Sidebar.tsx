import { BsFillCaretLeftFill as IconeClose } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Container, Content, ContinerHeader } from "./styles";

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
            <IconeClose onClick={closeSidebar} size="40"/>
            <h1>Menu</h1>
            </ContinerHeader>
            <Content>
                <Link to={''}>
                    <p>Rachões</p>
                </Link>
                <Link to={''}>
                    <p>Copa Hyper</p>
                </Link>
                <Link to={''}>
                    <p>Contato</p>
                </Link>
            </Content>
        </Container>
    )
}

export default Sidebar;