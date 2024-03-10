import React, {ChangeEvent, useState} from "react";
import {GetCurrentUser} from "../context/AuthContext";
import {Button} from "primereact/button";
import Sidebar from "../components/Sidebar";
import {Image} from "primereact/image";
import {getDownloadURL, refStorage, storage} from "../FirebaseService";
import {useUploadFile} from "react-firebase-hooks/storage";
import {InputText} from "primereact/inputtext";
import {InputMask} from "primereact/inputmask";

const EditUser = () => {

    const userLogin = GetCurrentUser();
    const [loading, setLoading] = useState(false);
    const [uploadFile] = useUploadFile()


    const handleChangeInputImage = async (e: ChangeEvent<HTMLInputElement>) => {

        setLoading(true);

        const file = e.target.files ? e.target.files[0] : undefined;

        if (file && userLogin) {

            userLogin.photo = await uploadImageEvent('users/profile/' , file);
        }

        setLoading(false)
    }

    const uploadImageEvent = async (rota: string, file: File) => {

        const ref = await refStorage(storage, `${rota}/${new Date().getTime()}.jpg`)
        await uploadFile(ref, file, {contentType: 'image/jpeg'})
        return getDownloadURL(ref);
    }

    return <>

        <div style={{padding: 10}} className="flex align-items-center justify-content-center">
            <Sidebar/>
            <div className="flex w-full justify-content-center font-bold">Editar meus dados</div>
        </div>
        <div className="flex flex-column align-items-center gap-5">
            <div style={{position: "relative", width: 100, height: 100, margin: 16}}>
                <div style={{overflow: "hidden", borderRadius: "50%"}}>
                    <Image preview width="100" height="100" src={userLogin?.photo || undefined}/>
                </div>
                <label htmlFor="image" style={{position: "absolute", bottom: -10, right: -10}}
                       className="p-button p-component p-button-icon-only p-button-rounded p-button-secondary">

                    <span className="pi pi-camera"/>
                </label>
            </div>

            <input type="file" id="image" hidden onChange={handleChangeInputImage} accept="image/*"/>

            <div className="flex flex-column container gap-3">
                <label htmlFor="name">Nome Sobrenome</label>
                <InputText id="name"/>
            </div>
            <div className="flex flex-column container gap-3">
                <label htmlFor="email">Email</label>
                <InputText id="email" type="email"/>
            </div>
            <div className="flex inline gap-3 justify-content-around container">
                <div className="w-50">
                    <label htmlFor="phone">Telefone</label>
                    <InputMask size={15} id="phone" mask="(99) 99999-9999" placeholder="(99) 99999-9999"/>
                </div>
                <div >
                    <label htmlFor="date">Data de Nascimento</label>
                    <InputMask size={15} mask="99/99/9999" slotChar="dd/mm/yyyy" placeholder="dd/mm/yyyy" id="date"/>
                </div>
            </div>

            <Button size="small" className="w-75" loading={loading} label="Salvar" rounded/>
        </div>
    </>
}

export default EditUser;