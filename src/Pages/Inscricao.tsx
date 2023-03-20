import {ContainerPageInscricao} from "./styles/Inscricao";
import GroupButtonCancelSave from "../components/GroupButtonCancelSave";
import RememberMe from "../components/RememberMe";

const Inscricao = () => {
    return <>
        <ContainerPageInscricao>
            <form action="">

                <label htmlFor="inputNomeSobrenome">Nome:</label>
                <input type="text" id="inputNomeSobrenome"/>

                <label htmlFor="inputTelefone">Telefone:</label>
                <input type="tel" id="inputTelefone"/>

                <label htmlFor="inputDtaNascimento">Data de Nasciemento:</label>
                <input type="date" id="inputDtaNascimento"/>

                <RememberMe />

            <GroupButtonCancelSave/>
            </form>
        </ContainerPageInscricao>
    </>
}

export default Inscricao;
