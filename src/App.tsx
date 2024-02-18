import {
    BrowserRouter, Route, Routes
} from "react-router-dom";
import React from "react";

import LoadingPage from "./views/LoadingPage";
import {NotFound} from "./views/NotFound";
import Home from "./views/Home";
import Login from "./views/Login";
import {Contact} from "./views/Contact";
import {Evento} from "./views/Evento";
import {MaisInformacoes} from "./views/MaisInformacoes";
import Categoria from "./views/Categoria";
import ConfirmationInscription from "./views/ConfirmationInscription";
import Inscricao from "./views/Inscricao";
import CriarEvento from "./views/CriarEvento";
import Admin from "./views/Admin";
import {AdminEvento} from "./views/AdminEvento";
import Perfil from "./views/Perfil";

import AuthContextProvider from "./context/AuthContext";
import {ProtectedRoute} from "./context/ProtectedRoute";

import './App.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'

import {routes} from "./routes/Routes";
import {auth} from "./FirebaseService";

const loadingElement = document.getElementById('loading');

export function loadingStop() {

    if (loadingElement) {

        return loadingElement.style.display = 'none';
    }
}

export function loadingStart() {

    if (loadingElement) {

        return loadingElement.style.display = 'flex';
    }
}

export const logoutUser = () => auth.signOut();

function App() {

    return (<>
            <LoadingPage/>
            <AuthContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<ProtectedRoute/>}>
                            <Route path={routes.user.admin} element={<Admin/>}/>
                            <Route path={routes.event.create} element={<CriarEvento/>}/>
                            <Route path="/evento/:idEvent/admin" element={<AdminEvento/>}/>
                            <Route path={routes.user.perfil} element={<Perfil/>}/>
                        </Route>
                        <Route path="/evento/:idEvent/categoria/:idCategory/confirmacao"
                               element={<ConfirmationInscription/>}/>
                        <Route path="/evento/:idEvent/categoria/:idCategory/inscricao"
                               element={<Inscricao/>}/>
                        <Route index
                               element={<Home/>}/>
                        <Route path="/login"
                               element={<Login/>}/>
                        <Route path="/todos"
                               element={<Home/>}/>
                        <Route path="/contato"
                               element={<Contact/>}/>
                        <Route path="/notfound"
                               element={<NotFound/>}/>
                        <Route path="/evento/:idEvent"
                               element={<Evento/>}/>
                        <Route path="/evento/:idEvent/informacoes"
                               element={<MaisInformacoes/>}/>
                        <Route path="/evento/:idEvent/categoria/:idCategory"
                               element={<Categoria/>}/>
                        <Route path="/evento/:idEvent/categoria/:idCategory/confirmacao"
                               element={<ConfirmationInscription/>}/>
                        <Route path="/evento/:idEvent/categoria/:idCategory/inscricao"
                               element={<Inscricao/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </>
    );
}

export default App;
