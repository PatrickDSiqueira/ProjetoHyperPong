import Header from "../components/Header";
import ListCardEvents from "../components/ListCardEvents";

interface Props {
    filterEvents ?: string
}

export default function Home({filterEvents}:Props) {

    return <>
        <Header titulo="Eventos Hyper"/>
        <ListCardEvents  filterEvents={filterEvents} />
    </>
}
