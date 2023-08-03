import {Link} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import React, {useState} from 'react';
import {Sidebar as SidebarMenu} from 'primereact/sidebar';

const Sidebar = () => {

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

    const closeSidebar = () =>{

        setVisible(false);
    }
    const openSidebar = () =>{

        setVisible(true);
    }

    return (
        <div className="">
            <SidebarMenu visible={visible}
                         onHide={closeSidebar}
                         style={styleSideBar} showCloseIcon={false}
                        >
                    <div className="p-sidebar-header" style={styleHeader} >
                        <i className="pi pi-caret-left" style={{fontSize:'25px'}} onClick={closeSidebar}/>
                        <h1 style={{marginLeft:'50px'}}>Menu</h1>
                    </div>
                    <div style={styleContent}>
                        <Link to={'/todos'} style={styleLink}>
                            <p className={location.pathname === '/todos' || location.pathname === '/' ? "currentPage" : ""} onClick={closeSidebar}>Todos</p>
                        </Link>
                        <Link to={'/copas'} style={styleLink}>
                            <p className={location.pathname === '/copas' ? "currentPage" : ""} onClick={closeSidebar}>Copas Hyper</p>
                        </Link>
                        <Link to={'/rachoes'} style={styleLink}>
                            <p className={location.pathname === '/rachoes' ? "currentPage" : ""} onClick={closeSidebar}>Rachões</p>
                        </Link>
                        <Link to={'/contato'} style={styleLink}>
                            <p className={location.pathname === '/contato' ? "currentPage" : ""} onClick={closeSidebar}>Contato</p>
                        </Link>
                        <Link to={'/login'} style={styleLink}>
                            <p className={location.pathname === '/login' ? "currentPage" : ""} onClick={closeSidebar}>Admin</p>
                        </Link>
                    </div>
            </SidebarMenu>
            <i className="pi pi-align-justify btn-info" style={{fontSize:'40px'}} onClick={openSidebar}/>
        </div>

    )
};

export default Sidebar;
