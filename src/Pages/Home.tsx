import Header from "../components/Header";
import ListCardEvents from "../components/ListCardEvents";

interface Props {
    filterEvents ?: string
}

export default function Home({filterEvents}:Props) {

    return <>
        <p>Teste deploy</p>
        <Header titulo="Eventos Hyper"/>
        <ListCardEvents  filterEvents={filterEvents} />
    </>
}
