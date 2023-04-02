import {ContainerPageInscricao} from "./styles/Inscricao";
import GroupButtonCancelSave from "../components/GroupButtonCancelSave";
import RememberMe from "../components/RememberMe";
import Header from "../components/Header";
import {useParams} from "react-router-dom";
const Inscricao = () => {

    type eventParams = {
        id: string,
        idcat: string
    }
    const params = useParams<eventParams>();

    return <>
        <Header titulo="Inscrição" />
        <ContainerPageInscricao>

            <form action={`http://localhost:4000/api/admin/events/${params.id}/category/${params.idcat}/participants`} method="post">

                <label htmlFor="nomeSobrenome" >Nome Sobrenome:</label>
                <input type="text" id="nomeSobrenome" name="nomeSobrenome" placeholder="Nome e Sobrenome"/>

                <label htmlFor="telefone">Telefone:</label>
                <input type="tel" id="telefone" name="telefone" placeholder="31 98430-5054"/>

                <label htmlFor="dtaNascimento">Data de Nasciemento:</label>
                <input type="date" id="dtaNascimento" name="dtaNascimento"/>

                <input type="number" name="status" value={0} hidden/>

                <RememberMe/>

                <GroupButtonCancelSave/>
            </form>
        </ContainerPageInscricao>
    </>
}

export default Inscricao;
