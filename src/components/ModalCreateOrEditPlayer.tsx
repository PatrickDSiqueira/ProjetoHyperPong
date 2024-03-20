import {Button} from "primereact/button";
import React, {useState} from "react";
import Modal from "react-modal";
import {InputText} from "primereact/inputtext";
import Player from "../Model/Player";

export const ModalCreatePlayer = () => {

    const [show, setModal] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setErrors] = useState<string[]>([]);

    const [dataPlayer, setDataPlayer] = useState({
        name: ''
    });

    const hideModal = () => setModal(false);
    const showModal = () => setModal(true);

    const handleChangeUserData = (name: string) => setDataPlayer((prevState) => ({...prevState, name: name}))

    const savePlayer = () => {

        setErrors([]);

        setLoading(true);

        const player = new Player(dataPlayer.name);

        player.save().then(({ok, errors}) => {

            if (ok) {

                hideModal();

            } else {

                setErrors(errors ?? []);
            }

            setLoading(false);
        })

    }

    return <>
        <Button icon="pi pi-plus" onClick={showModal} className="p-button-sm" severity="success" rounded raised/>

        <Modal
            isOpen={show}
            onRequestClose={hideModal}
            closeTimeoutMS={200}
            style={{
                overlay: {
                    zIndex: 1,
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
            <div className="modal-header">
                <h2>Novo atleta</h2>
            </div>
            <div className="modal-body">

                <div className="flex flex-column gap-2">
                    <label htmlFor="name">Nome</label>
                    <InputText id="name" value={dataPlayer.name}
                               onChange={(e) => handleChangeUserData(e.target.value)}/>
                </div>
                <div>
                    {error.map((error, i) => <span key={i} className="p-error">{error}</span>)}
                </div>
            </div>
            <div className="modal-footer">
                <Button severity="secondary" onClick={hideModal} loading={loading}>Cancelar</Button>
                <Button onClick={savePlayer} loading={loading}>Salvar</Button>
            </div>
        </Modal>
    </>
}

