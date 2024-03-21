import {Link} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import React, {useState} from 'react';
import {Sidebar as SidebarMenu} from 'primereact/sidebar';
import {routes} from "../routes/Routes";
import {GetCurrentUser} from "../context/AuthContext";

const Sidebar = () => {

    const userLogin = GetCurrentUser();

    const location = useLocation();

    const [visible, setVisible] = useState<boolean>(false);

    const styleSideBar = {
        backgroundColor: '#171923',
        color: '#C1FF00',
    }

    const styleContent = {
        marginTop: '100px',
        paddingLeft: '32px'
    }

    const styleLink = {
        textDecoration: 'none',
        cursor: 'pointer',
        paddingTop: '24px',
        fontSize: '24px',
        color: '#FFFFFF'
    }

    const styleHeader = {
        marginLeft: '32px',
        marginTop: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
    }

    const closeSidebar = () => {

        setVisible(false);
    }
    const openSidebar = () => {

        setVisible(true);
    }

    const links = () => {

        const items = [
            {path: routes.event.all, label: 'Eventos'},
            {path: routes.ranking, label: 'Ranking'},
            {path: routes.contact, label: 'Contato'},
        ];

        if (userLogin) {

            items.push({path: routes.user.admin, label: 'Admin'});

        } else {

            items.push({path: routes.auth.login, label: 'Login'})
        }

        return items;
    }

    const isActualPathClassName = (actualPath: string) => location.pathname === actualPath ? "currentPage" : "";

    return (
        <div className="">
            <i className="pi pi-align-justify btn-info" style={{fontSize: '30px'}} onClick={openSidebar}/>
            <SidebarMenu visible={visible}
                         onHide={closeSidebar}
                         style={styleSideBar} showCloseIcon={false}
            >
                <div className="p-sidebar-header" style={styleHeader}>
                    <i className="pi pi-caret-left" style={{fontSize: '25px'}} onClick={closeSidebar}/>
                    <h1 style={{marginLeft: '50px'}}>Menu</h1>
                </div>
                <div style={styleContent}>
                    {links().map(({path, label}, key) => <Link key={key} to={path} style={styleLink}>
                        <p className={isActualPathClassName(path)}>{label}</p>
                    </Link>)}
                </div>
            </SidebarMenu>
        </div>

    )
};

export default Sidebar;
