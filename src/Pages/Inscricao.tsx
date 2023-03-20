import {ContainerPageInscricao} from "./styles/Inscricao";
import GroupButtonCancelSave from "../components/GroupButtonCancelSave";
import RememberMe from "../components/RememberMe";
import Header from "../components/Header";

const Inscricao = () => {
    return <>
        <Header titulo="Inscrição" />
        <ContainerPageInscricao>
            <form action="">

                <label htmlFor="inputNomeSobrenome" >Nome Sobrenome:</label>
                <input type="text" id="inputNomeSobrenome" placeholder="Nome e Sobrenome"/>

                <label htmlFor="inputTelefone">Telefone:</label>
                <input type="tel" id="inputTelefone" placeholder="31 98430-5054"/>

                <label htmlFor="inputDtaNascimento">Data de Nasciemento:</label>
                <input type="date" id="inputDtaNascimento"/>

                <RememberMe/>

                <GroupButtonCancelSave/>
            </form>
        </ContainerPageInscricao>
    </>
}

export default Inscricao;
