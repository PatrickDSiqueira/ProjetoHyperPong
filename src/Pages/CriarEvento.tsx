import { Link } from "react-router-dom";

export default function CriarEvento() {
    return <>
        <h1>Criar Evento</h1>
        <form action="http://localhost:4000/criarEvento" method="post">

            <label htmlFor="nomeEvento">Nome:</label>
            <input type="text" placeholder="Nome do Evento" id="nomeEvento" name="nomeEvento" />

            <label htmlFor="numeroParticipantes">Horário:</label>
            <input type="number" placeholder="Número de Participantes" id="numeroParticipantes" name="numeroParticipantes" />

            <label htmlFor="data">Data:</label>
            <input type="date" placeholder="Data" id="data" name="data" />

            <label htmlFor="descricao">Descrição</label>
            <input type="text" placeholder="Descrição" id="descricao" name="descricao" />
            
            <button type="submit">Criar</button>
            <button type="button">Cancelar</button>
        </form>
    </>
}