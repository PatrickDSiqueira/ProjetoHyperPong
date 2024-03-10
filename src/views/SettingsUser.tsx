import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "primereact/button";
import {GetCurrentUser} from "../context/AuthContext";
import {Image} from "primereact/image";
import {Card} from "primereact/card";
import {MdOutlineMail} from "react-icons/md";
import {auth} from "../FirebaseService";
import foto from "../images/image.jpg";
import {routes} from "../routes/Routes";
import {log} from "node:util";

const SettingsUser = () => {

    const userLogin = GetCurrentUser();

    const navigate = useNavigate();

    const handleLogout = () => auth.signOut().then(() => {
        navigate(routes.auth.login)
    });

    const getIcon = (name: string, fontSize = "2rem") => <span className={name} style={{fontSize}}/>;
    const SettingsElementsTemplate = () => {
        const settings = {
            "Contato e avaliação": [
                {
                    icon: <MdOutlineMail fontSize={"2rem"}/>,
                    action: () => navigate(routes.client.contact),
                    name: "Entrar em contato"
                },
                {
                    icon: getIcon("pi pi-star"),
                    action: () => navigate(routes.client.evaluate),
                    name: "Avaliar aplicação"
                },
                {
                    icon: getIcon('pi pi-question-circle'),
                    action: () => navigate(routes.client.questions),
                    name: "Tirar dúvidas"
                },
            ],
            "Redes Sociais": [
                {
                    icon: getIcon('pi pi-instagram'),
                    action: () => window.open('https://www.instagram.com/hyperpongbh/', '_blank'),
                    name: "Seguir no Instagram"
                },
            ],
            Outros: [
                {
                    icon: getIcon("pi pi-arrow-circle-right"),
                    action: () => handleLogout(),
                    name: "Logout"
                },
            ],
        }

        return <span>{
            Object.entries(settings).map(([title, list] ) => {
                return <div key={title}>
                    <h4 style={{marginLeft: 20}}>{title}</h4>
                    <div className="flex flex-wrap justify-content-between">
                        {list.map((item) => {
                            return <div className="w-50" style={{padding: 16}}>
                                <Card onClick={item.action} key={item.name}>
                                    {item.icon}
                                    <p className="font-bold" style={{margin: 0}}>{item.name}</p>
                                </Card>
                            </div>
                        })}
                    </div>
                </div>
            })
        }</span>
    }

    return <>
        <div className="flex align-items-center">
            <Button style={{marginRight: 10}} icon="pi pi-angle-left" text severity="info"
                    onClick={() => navigate(-1)}/>
            <span className="font-bold text-center flex-1">Configurações</span>
        </div>
        <div className="flex align-items-center">
            <div style={{overflow: "hidden", borderRadius: "50%", width: 100, margin: 16}}>
                <Image preview width="100" height="100" src={userLogin?.photo || undefined}/>
            </div>
            <div>
                <span className="font-bold">{userLogin?.full_name}</span>
                <Link to={routes.user.edit} onClick={() => navigate(routes.user.edit)}
                      className="text-decoration-none link-info flex align-items-center">
                    <span style={{fontSize: "small"}}>Editar meus dados</span>
                    <span className="pi pi-angle-right"/>
                </Link>
            </div>
        </div>
        <SettingsElementsTemplate/>
    </>
}

export default SettingsUser;