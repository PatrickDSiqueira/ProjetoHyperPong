import {ContainerPageInscricao} from "./styles/Inscricao";
import RememberMe from "../components/RememberMe";
import Header from "../components/Header";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {child, database, push, ref, set} from "../FirebaseService";
import LoadingPage from "./LoadingPage";
import GroupButtonCancelSubmit from "../components/Form";
import {ParticipantType} from "../types/types";

const Inscricao = () => {

    type eventParams = {
        id: string,
        idcat: string
    }

    const params = useParams<eventParams>();

    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();

    const [visibleLoading, setVisibleLoading] = useState(false)

    const [rememberMe, setRememberMe] = useState(false);

    const data = localStorage.getItem('loginInscription');

    if (data !== null){
        const {nomeSobrenome, telefone, dtaNascimento} : ParticipantType =JSON.parse(data);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        // setVisibleLoading(true);

        event.preventDefault();

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const values = Object.fromEntries(formData.entries());

            const {nomeSobrenome, telefone, dtaNascimento, status} = values;



            if (rememberMe){
                const login = {nomeSobrenome, telefone, dtaNascimento}
                localStorage.setItem('loginInscription',JSON.stringify(login))
            } else {
                localStorage.removeItem('loginInscription');
            }
            //
            // const idParticipants = push(child(ref(database), `events/${params.id}/categoryObj/${params.idcat}/participants`)).key;
            //
            // await set(ref(database, `events/${params.id}/categories/${params.idcat}/participants/${idParticipants}`), {
            //         idParticipants,
            //         nomeSobrenome,
            //         telefone,
            //         dtaNascimento,
            //         status
            //     }
            // );
            //
            //
            // navigate(`/evento/${params.id}/categoria/${params.idcat}`)
            // return;

        }
    }


    return <>
        <Header titulo="Inscrição"/>
        {visibleLoading && <LoadingPage/>}
        {!visibleLoading &&
            <ContainerPageInscricao>

                <form ref={formRef} onSubmit={handleSubmit}>

                    <label htmlFor="nomeSobrenome">Nome Sobrenome:</label>
                    <input type="text" id="nomeSobrenome" defaultValue={} name="nomeSobrenome" placeholder="Nome e Sobrenome"/>

                    <label htmlFor="telefone">Telefone:</label>
                    <input type="tel" id="telefone" name="telefone" placeholder="31 98430-5054"/>

                    <label htmlFor="dtaNascimento">Data de Nasciemento:</label>
                    <input type="date" id="dtaNascimento" name="dtaNascimento"/>

                    <input type="number" name="status" value={0} hidden/>

                    <RememberMe setValue={setRememberMe} />

                    <GroupButtonCancelSubmit model={"Salvar"}/>
                </form>
            </ContainerPageInscricao>}
    </>
}

export default Inscricao;
