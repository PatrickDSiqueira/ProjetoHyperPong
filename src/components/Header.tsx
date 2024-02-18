import Sidebar from "./Sidebar";
import { Container } from "./styles/Header";


interface Props {
    titulo : string | undefined
}

export default function Header({titulo} : Props) {

    return <Container>
        <Sidebar />
        <h1>{titulo}</h1>
    </ Container>
}