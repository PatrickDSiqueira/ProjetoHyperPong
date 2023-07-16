import Header from "../components/Header";
import ListCardEvents from "../components/ListCardEvents";

interface Props {
    filterEvents ?: string
}

export default function Home({filterEvents}:Props) {

    return <>
        <Header titulo="Eventos Hyper"/>

        <p>Teste de Deploy</p>
        <ListCardEvents  filterEvents={filterEvents} />
    </>
}
