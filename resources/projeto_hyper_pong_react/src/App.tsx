import {
  BrowserRouter,
  Route, Routes
} from "react-router-dom";
import Home from "./Pages/Home";
import './App.css';
import { Evento } from "./Pages/Evento";
import Participantes from "./Pages/Participantes";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<Home />}  />
        <Route path="/copas" element={<Home />}  />
        <Route path="/rachoes" element={<Home />}  />
        <Route path="/contato" element={<Home />}  />
        <Route path="/evento" element={<Evento />}  />
        <Route path="/partipantes" element={<Participantes />}  />
    </Routes>
    </BrowserRouter>
  );
}

export default App;