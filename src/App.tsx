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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/copas" element={<Home filterEvents={"1"}/>}/>
                <Route path="/rachoes" element={<Home filterEvents={"0"}/>}/>
                <Route path="/todos" element={<Home/>}/>
                <Route path="/contato" element={<Home/>}/>
                <Route path="/evento/criar" element={<CriarEvento/>}/>
                <Route path="/evento/:id" element={<Evento/>}/>
                <Route path="/evento/:id/informacoes" element={<MaisInformacoes />}/>
                <Route path="/evento/:id/categoria/:idcat" element={<Categoria/>}/>
                <Route path="/evento/:id/categoria/:idcat/inscricao" element={<Inscricao/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
