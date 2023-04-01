import {
    BrowserRouter,
    Route, Routes
} from "react-router-dom";
import Home from "./Pages/Home";
import './App.css';
import {Evento} from "./Pages/Evento";
import Participantes from "./Pages/Participantes";
import Inscricao from "./Pages/Inscricao";
import CriarEvento from "./Pages/CriarEvento";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/copas" element={<Home/>}/>
                <Route path="/rachoes" element={<Home/>}/>
                <Route path="/contato" element={<Home/>}/>
                <Route path="/evento/:id" element={<Evento/>}/>
                <Route path=":/evento/:id/partipantes" element={<Participantes/>}/>
                <Route path="/admim/criar/evento" element={<CriarEvento/>}/>
                <Route path="/inscricao" element={<Inscricao/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
