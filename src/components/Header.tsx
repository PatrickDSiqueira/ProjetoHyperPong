import Sidebar from "./Sidebar";
import { Container } from "./styles/Header";


interface Props {
    titulo : string | undefined
}

export default function Header(props : Props) {
    const {titulo} = props

    return <Container>
        <Sidebar />
        <h1>{titulo}</h1>
    </ Container>
}