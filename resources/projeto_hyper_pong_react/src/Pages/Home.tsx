import CardEvento, {Status} from "../components/CardEvento";
import Header from "../components/Header";

export default function Home() {
    return <>
        <Header titulo="Lista de Eventos Hyper"/>

        <CardEvento bg="#47D144" data="02/12/2022" titulo="Rachão Fevereiro"  status={Status[0]}/>
        <CardEvento bg="#F84141" data="03/05/2023" titulo="Copa Hyper Março" status={Status[1]}/>
        <CardEvento bg="#F0C838"  data="04/07/2022" titulo="Rachão Abril" status={Status[0]}/>
        <CardEvento bg="#F0C838"  data="04/07/2022" titulo="Rachão Abril" status={Status[0]}/>
    </>
}
