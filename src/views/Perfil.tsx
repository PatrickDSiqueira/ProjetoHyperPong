import React from "react";
import {GetCurrentUser} from "../context/AuthContext";
import {Button} from "primereact/button";
import Sidebar from "../components/Sidebar";
import {Tag} from "primereact/tag";
import {Image} from "primereact/image";
import foto from "../images/image.jpg"
import {loadingStart} from "../App";

const Perfil = () => {

    const userLogin = GetCurrentUser();

    userLogin.name = "Patrick Siqueira"
    userLogin.foto = foto;

    const navigateToSettings = () => {

        loadingStart();

        window.location.href = window.location.href + "/setting";
    };

    return <>

        <div style={{color: '#1A202C', padding: 10, backgroundColor: "#ccc"}}
             className="flex align-items-center justify-content-center">
            <Sidebar/>
            <div className="flex w-full justify-content-center">
                Perfil
            </div>

            <Tag icon="pi pi-user" rounded severity="success" value={12} className="border border-600"/>
        </div>
        <div className="flex flex-column align-items-center"
             style={{color: '#1A202C', padding: 10, backgroundColor: "#ccc"}}>
            <div style={{overflow: "hidden", borderRadius: "50%", border: 'solid black 2px'}}>
                <Image preview width="150" height="150" src={userLogin.foto}/>
            </div>
            <span style={{fontWeight: "bolder", fontSize: "large", paddingTop: 16}}>{userLogin.name}</span>
            <span style={{fontSize: "small"}}>Hyper atleta desde 2024</span>
            <div style={{paddingTop: 16}}>
                <Button rounded size="small" icon="pi pi-cog" label="Configurações"
                        onClick={navigateToSettings}/>
            </div>
        </div>
        <div>
            Eventos que participou
            pontuação ranking
            Eventos novos
            idadte
            telefone

        </div>
    </>
}

export default Perfil;