import {ContainerPageInscricao} from "./styles/Inscricao";
import GroupButtonCancelSave from "../components/GroupButtonCancelSave";
import RememberMe from "../components/RememberMe";
import Header from "../components/Header";
import {useNavigate, useParams} from "react-router-dom";
import React, {useRef} from "react";
import {child, database, push, ref, set} from "../FirebaseService";
const Inscricao = () => {

    type eventParams = {
        id: string,
        idcat: string
    }
    const params = useParams<eventParams>();

    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const values = Object.fromEntries(formData.entries());

            const {nomeSobrenome, telefone, dtaNascimento, status} = values;

            const idParticipants = push(child(ref(database), `eventos/${params.id}/categoriasObj/${params.idcat}/participantes`)).key;

            await set(ref(database, `eventos/${params.id}/categoriasObj/${params.idcat}/participantes/${idParticipants}`), {
                    idParticipants,
                    nomeSobrenome,
                    telefone,
                    dtaNascimento,
                    status
                }
            );

            navigate(`/evento/${params.id}/categoria/${params.idcat}`)
            return;

        }


    }


    return <>
        <Header titulo="Inscrição" />
        <ContainerPageInscricao>

            <form ref={formRef} onSubmit={handleSubmit}>

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
