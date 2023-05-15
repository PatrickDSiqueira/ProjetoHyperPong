import Header from "../components/Header";
import ListCardEvents from "../components/ListCardEvents";

import DownloadAlert from '../components/DownloadAlert';

interface Props {
    filterEvents ?: string
 
}
    export default function Home({filterEvents}:Props) {
    return <>
        <Header titulo="Lista de Eventos Hyper"/>
        <ListCardEvents  filterEvents={filterEvents} />

        <div>

      <button className='download-button' onClick={DownloadAlert}>Adicionar na tela inicial</button>
    </div>
    </>
    }