
import CardEvento from "../components/CardEvento/CardEvento";
import Header from "../components/header/Header";

export default function Home() {
    return <>
        <Header titulo="Lista de Eventos Hyper"/>

        <CardEvento bg="#47D144" data="02/12/2022" titulo="Rachão Fevereiro" />
        <CardEvento bg="#F84141" data="03/05/2023" titulo="Copa Hyper Março" />
        <CardEvento bg="#F0C838"  data="04/07/2022" titulo="Rachão Abril"/>
        {/* <CardEvento bg="#020000"  data="03/01/2023" titulo="Rachão Abril"/> */}
    </>
}