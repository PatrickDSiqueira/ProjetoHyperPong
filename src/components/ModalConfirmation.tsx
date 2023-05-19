import React from 'react';
import Modal from 'react-modal';
import {ButtonCancel, ButtonSave, ContainerButtons} from "./styles/Form";

Modal.setAppElement('#root');

interface Props {
    openModalConfirmation: boolean,
    setOpenModalConfirmation: React.Dispatch<React.SetStateAction<boolean>>
}

function ModalConfirmation({setOpenModalConfirmation, openModalConfirmation}: Props) {

    function handleSubmit() {
        const button = document.getElementById('sendInscription');
        if (button) {
            button.click()
        }
    }

    return (
        <div>
            <Modal
                isOpen={openModalConfirmation}
                onRequestClose={() => setOpenModalConfirmation(false)}
                contentLabel="Modal de confirmação"
                closeTimeoutMS={200}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0 ,0, 0.8)'
                    },
                    content: {
                        border: '1px solid green',
                        background: '#fff',
                        borderRadius: '20px',
                        padding: '20px',
                        maxHeight: 'max-content',
                    }
                }}
            >
                <p>Número máximo de participantes atingido.</p>
                <p>Você está entrando em uma lista de espera.</p>
                <p>Deseja continuar?</p>
                <ContainerButtons>
                    <ButtonCancel type="button" onClick={() => setOpenModalConfirmation(false)}>Cancelar</ButtonCancel>
                    <ButtonSave type="button" onClick={handleSubmit}>Continuar</ButtonSave>
                </ContainerButtons>
            </Modal>
        </div>
    );
}

export default ModalConfirmation;