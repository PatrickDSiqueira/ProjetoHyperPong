import Header from "../components/Header";
import {ShowHistoryLogs} from "../components/ShowHistoryLogs";
import TableEvents from "../components/TableEvents";

const Admin = () => {

    return <>
        <Header titulo={"Admin"}/>
        <div style={{display: 'flex', height: '100vh', width: '100vw', flexDirection: 'column'}}>
            <TableEvents/>
            <ShowHistoryLogs/>
        </div>
    </>
}

export default Admin;