import CardEvento, {Status} from "../components/CardEvento";
import Header from "../components/Header";
import database from "../Database";

export default function Home() {

    console.log(database.CardEvento[0].bg);
    
    return <>
        <Header titulo="Lista de Eventos Hyper"/>

        <CardEvento bg={database.CardEvento[1].bg} data={database.CardEvento[1].data} titulo={database.CardEvento[1].titulo}  status={database.CardEvento[1].status}/>
        <CardEvento bg={database.CardEvento[2].bg} data={database.CardEvento[2].data} titulo={database.CardEvento[2].titulo}  status={database.CardEvento[2].status}/>
        <CardEvento bg={database.CardEvento[3].bg} data={database.CardEvento[3].data} titulo={database.CardEvento[3].titulo}  status={database.CardEvento[3].status}/>
        <CardEvento bg={database.CardEvento[3].bg} data={database.CardEvento[1].data} titulo={database.CardEvento[1].titulo}  status={database.CardEvento[1].status}/>
        <CardEvento bg={database.CardEvento[0].bg} data={database.CardEvento[0].data} titulo={database.CardEvento[0].titulo}  status={database.CardEvento[0].status}/>

    </>
}
