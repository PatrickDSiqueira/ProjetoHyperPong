import Header from "../components/Header";
import {ShowHistoryLogs} from "../components/ShowHistoryLogs";
import TableEvents from "../components/TableEvents";
import {logoutUser} from "../App";
import {useNavigate} from "react-router-dom";
import {routes} from "../routes/Routes";
import {Button} from "primereact/button";
import UserList from "../components/UserList";

const Admin = () => {

    const navigate = useNavigate();

    async function handleLogout() {

        await logoutUser();

        navigate(routes.auth.login);
    }

    return <>
        <Header titulo={"Admin"}/>
        <div style={{display: 'flex', height: '100vh', width: '100vw', flexDirection: 'column'}}>
            <TableEvents/>
            <UserList/>
            <ShowHistoryLogs/>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Button icon="pi pi-user" label="Logout" onClick={handleLogout}/>
            </div>
        </div>
    </>
}

export default Admin;