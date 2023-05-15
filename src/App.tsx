import {
    BrowserRouter,
    Route, Routes
} from "react-router-dom";
import Home from "./Pages/Home";
import './App.css';
import {Evento} from "./Pages/Evento";
import Categoria from "./Pages/Categoria";
import Inscricao from "./Pages/Inscricao";
import CriarEvento from "./Pages/CriarEvento";
import {MaisInformacoes} from "./Pages/MaisInformacoes";
import Login from "./Pages/Login";
import AuthContextProvider from "./context/AuthContext";
import {Contact} from "./Pages/Contact";
import {NotFound } from "./Pages/NotFound";

function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="*" element={<NotFound />}/>
                    <Route path="/copas" element={<Home filterEvents={"1"}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/rachoes" element={<Home filterEvents={"0"}/>}/>
                    <Route path="/todos" element={<Home/>}/>
                    <Route path="/contato" element={<Contact />}/>
                    <Route path="/notfound" element={<NotFound />}/>
                    <Route path="/evento/criar" element={<CriarEvento/>}/>
                    <Route path="/evento/:idEvent" element={<Evento/>}/>
                    <Route path="/evento/:idEvent/informacoes" element={<MaisInformacoes/>}/>
                    <Route path="/evento/:idEvent/categoria/:idCategory" element={<Categoria/>}/>
                    <Route path="/evento/:idEvent/categoria/:idCategory/inscricao" element={<Inscricao/>}/>
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;
