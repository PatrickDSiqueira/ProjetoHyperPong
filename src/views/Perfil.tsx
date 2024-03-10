import React from "react";
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";
import {routes} from "../routes/Routes";
import {logoutUser} from "../App";
import {Button} from "primereact/button";

const Perfil = () => {

    const navigate = useNavigate();

    async function handleLogout() {

        await logoutUser();

        navigate(routes.auth.login);
    }

    return <>
        <Header titulo="Login" />

        <div style={{color: '#1A202C', marginLeft: 10, marginRight: 10}}>

            <Button icon="pi pi-user" onClick={handleLogout}/>
        </div>
    </>
}

export default Perfil;