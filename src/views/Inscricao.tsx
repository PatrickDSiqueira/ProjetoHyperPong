import {ContainerPageInscricao} from "../Pages/styles/Inscricao";
import RememberMe from "../components/RememberMe";
import Header from "../components/Header";
import {useNavigate, useParams} from "react-router-dom";
import React, {useRef, useState} from "react";
import {child, database, push, ref, set} from "../FirebaseService";
import {routeParams} from "../types/types";
import {useMaxParticipantsCategory} from "../hooks/useMaxParticipantsCategory";
import ModalConfirmation from "../components/ModalConfirmation";
import {ButtonCancel, ButtonSave, ContainerButtons} from "../components/styles/Form";
import {GetNameEvent} from "../hooks/Event";
import {GetCategoryName} from "../hooks/Category";
import {CreateLog} from "../hooks/Log";

const Inscricao = () => {

    const {idEvent, idCategory} = useParams<routeParams>();
    const [openModalConfirmation, setOpeModalConfirmation] = useState<boolean>(false);
    const eventName = GetNameEvent(idEvent);
    const categoryName = GetCategoryName(idEvent, idCategory);

    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const nomeSobrenome = localStorage.getItem('nameInscription') || "";
    const telefone = localStorage.getItem('telefoneInscription') || "";
    const dtaNascimento = localStorage.getItem('dtaNascimentoInscription') || "";
    const [rememberMe, setRememberMe] = useState(nomeSobrenome !== "");

    const {maxParticipantsCategory, participantsConfirm} = useMaxParticipantsCategory(idEvent, idCategory);

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
            )
                .then(() => {
                  CreateLog(2, `<b>${eventName}</b> - <b>${nomeSobrenome}</b> se inscreveu na categoria ${categoryName}.`);
                })
                .catch((e) => {
                    console.log(e);
                    CreateLog(3, `<b>${eventName}</b> - falha ao <b>${nomeSobrenome}</b> se inscrever na categoria ${categoryName}.`)
                });

            navigate(`/evento/${idEvent}/categoria/${idCategory}/confirmacao`);
            return;
        }
    }

    function checkParticipantsNumber() {
        if (maxParticipantsCategory && participantsConfirm >= maxParticipantsCategory) {
            setOpeModalConfirmation(true);
        } else {
            const button = document.getElementById('sendInscription');
            if (button) {
                button.click()
            }
        }
    }

    return <>
        <Header titulo="Inscrição"/>
        <ContainerPageInscricao>

            <form ref={formRef} onSubmit={handleSubmit}>

                <label htmlFor="nomeSobrenome">Nome Sobrenome:</label>
                <input type="text" id="nomeSobrenome" name="nomeSobrenome" defaultValue={nomeSobrenome}
                       placeholder="Nome e Sobrenome" required/>

                <label htmlFor="telefone">Telefone:</label>
                <input type="tel" id="telefone" name="telefone" defaultValue={telefone}
                       placeholder="99 99999-9999" required/>

                <label htmlFor="dtaNascimento">Data de Nascimento:</label>
                <input type="date" id="dtaNascimento" defaultValue={dtaNascimento} name="dtaNascimento" required/>

                <input type="number" name="status" value={0} readOnly hidden/>

                <RememberMe setValue={setRememberMe} value={rememberMe}/>

                <ModalConfirmation openModalConfirmation={openModalConfirmation}
                                   setOpenModalConfirmation={setOpeModalConfirmation}/>

                <button hidden type={'submit'} id="sendInscription"/>
                <ContainerButtons>
                    <ButtonCancel type="button"
                                  onClick={() => navigate(`/evento/${idEvent}/categoria/${idCategory}`)}>Cancelar</ButtonCancel>
                    <ButtonSave type="button" onClick={checkParticipantsNumber}>Salvar</ButtonSave>
                </ContainerButtons>
            </form>
        </ContainerPageInscricao>
    </>
}

export default Inscricao;