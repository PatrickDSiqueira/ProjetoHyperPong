import {ContainerPageInscricao} from "./styles/Inscricao";
import RememberMe from "../components/RememberMe";
import Header from "../components/Header";
import {useNavigate, useParams} from "react-router-dom";
import React, {useRef, useState} from "react";
import {child, database, push, ref, set} from "../FirebaseService";
import GroupButtonCancelSubmit from "../components/Form";
import {routeParams} from "../types/types";

const Inscricao = () => {

    const {idEvent, idCategory} = useParams<routeParams>();

    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const nomeSobrenome = localStorage.getItem('nameInscription') || "";
    const telefone = localStorage.getItem('telefoneInscription') || "";
    const dtaNascimento = localStorage.getItem('dtaNascimentoInscription') || "";
    const [rememberMe, setRememberMe] = useState(nomeSobrenome !== "");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const values = Object.fromEntries(formData.entries());

            const {nomeSobrenome, telefone, dtaNascimento, status} = values;

            if (rememberMe){
                localStorage.setItem('nameInscription', nomeSobrenome.toString())
                localStorage.setItem('telefoneInscription', telefone.toString())
                localStorage.setItem('dtaNascimentoInscription', dtaNascimento.toString())
            } else {
                localStorage.removeItem('nameInscription');
                localStorage.removeItem('telefoneInscription');
                localStorage.removeItem('dtaNascimentoInscription');
            }

            const idParticipants = push(child(ref(database), `events/${idEvent}/categoryObj/${idCategory}/participants`)).key;

            await set(ref(database, `events/${idEvent}/categories/${idCategory}/participants/${idParticipants}`), {
                    idParticipants,
                    nomeSobrenome,
                    telefone,
                    dtaNascimento,
                    status
                }
            );


            navigate(`/evento/${idEvent}/categoria/${idCategory}`)
            return;

        }
    }


    return <>
        <Header titulo="Inscrição"/>
            <ContainerPageInscricao>

                <form ref={formRef} onSubmit={handleSubmit}>

                    <label htmlFor="nomeSobrenome">Nome Sobrenome:</label>
                    <input type="text" id="nomeSobrenome" name="nomeSobrenome" defaultValue={nomeSobrenome}
                           placeholder="Nome e Sobrenome" required />

                    <label htmlFor="telefone">Telefone:</label>
                    <input type="tel" id="telefone" name="telefone" defaultValue={telefone}
                           placeholder="99 99999-9999" required />

                    <label htmlFor="dtaNascimento">Data de Nasciemento:</label>
                    <input type="date" id="dtaNascimento" defaultValue={dtaNascimento} name="dtaNascimento" required/>

                    <input type="number" name="status" value={0} hidden/>

                    <RememberMe setValue={setRememberMe} value={rememberMe}/>

                    <GroupButtonCancelSubmit model={"Salvar"}/>
                </form>
            </ContainerPageInscricao>
    </>
}

export default Inscricao;
