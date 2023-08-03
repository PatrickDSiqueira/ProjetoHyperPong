import {
    BrowserRouter,
    Route, Routes
} from "react-router-dom";
import Home from "./views/Home";
import './App.css';
import {Evento} from "./views/Evento";
import Categoria from "./views/Categoria";
import Inscricao from "./views/Inscricao";
import CriarEvento from "./views/CriarEvento";
import {MaisInformacoes} from "./views/MaisInformacoes";
import Login from "./views/Login";
import AuthContextProvider from "./context/AuthContext";
import {Contact} from "./views/Contact";
import {NotFound} from "./views/NotFound";
import ConfirmationInscription from "./views/ConfirmationInscription";
import LoadingPage from "./views/LoadingPage";

import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';


export function loadingStop() {

    const loadingElement = document.getElementById('loading');

    if (loadingElement) {

        return loadingElement.style.display = 'none';
    }

}

export function loadingStart() {

    const loadingElement = document.getElementById('loading');

    if (loadingElement) {

        return loadingElement.style.display = 'flex';
    }
}

function App() {

    return (<>
            <LoadingPage/>
            <AuthContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Home/>}/>
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="/copas" element={<Home filterEvents={"1"}/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/rachoes" element={<Home filterEvents={"0"}/>}/>
                        <Route path="/todos" element={<Home/>}/>
                        <Route path="/contato" element={<Contact/>}/>
                        <Route path="/notfound" element={<NotFound/>}/>
                        <Route path="/evento/criar" element={<CriarEvento/>}/>
                        <Route path="/evento/:idEvent" element={<Evento/>}/>
                        <Route path="/evento/:idEvent/informacoes" element={<MaisInformacoes/>}/>
                        <Route path="/evento/:idEvent/categoria/:idCategory" element={<Categoria/>}/>
                        <Route path="/evento/:idEvent/categoria/:idCategory/confirmacao"
                               element={<ConfirmationInscription/>}/>
                        <Route path="/evento/:idEvent/categoria/:idCategory/inscricao" element={<Inscricao/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </>
    );
}

export default App;
