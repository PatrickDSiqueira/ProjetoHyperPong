import React, {ChangeEvent, useRef, useState} from "react";
import {
    auth,
    browserLocalPersistence, createUser, getDownloadURL,
    refStorage,
    setPersistence,
    signInWithEmailAndPassword, storage
} from "../FirebaseService";
import Header from "../components/Header";
import {Link, useNavigate} from "react-router-dom";
import {routes} from "../routes/Routes";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Image} from "primereact/image";
import {InputMask} from "primereact/inputmask";
import {Password} from "primereact/password";
import {useUploadFile} from "react-firebase-hooks/storage";
import moment from "moment";
import {User} from "../Model/User";

const Register = () => {

    const [profile_photo, setProfilePhoto] = useState<string | null>(null)

    const navigate = useNavigate();

    const formRef = useRef<HTMLFormElement>(null);

    const [loading, setLoading] = useState(false);

    const [uploadFile] = useUploadFile()

    const handleChangePhotoProfile = async (e: ChangeEvent<HTMLInputElement>) => {

        setLoading(true);

        const file = e.target.files ? e.target.files[0] : undefined;

        if (file) {

            setProfilePhoto(await uploadImageEvent('users/profile/', file));
        }

        setLoading(false)
    }

    const uploadImageEvent = async (rota: string, file: File) => {

        const ref = await refStorage(storage, `${rota}/${new Date().getTime()}.jpg`)
        await uploadFile(ref, file, {contentType: 'image/jpeg'})
        return getDownloadURL(ref);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        setLoading(true)

        event.preventDefault();

        const form = formRef.current;

        if (form) {

            if (!form.checkValidity()) {

                form.reportValidity();
                return;
            }
            const formData = new FormData(formRef.current);

            const values: { [key: string]: string } = {};

            formData.forEach((value, key) => {
                if (typeof value === 'string') {
                    values[key] = value;
                }
            });

            const {date, email, name, phone, password} = values;

            const numericPhoneNumber = phone.replace(/\D/g, "");

            const dateFormat = moment(date, 'DD/MM/YYYY').format("YYYY-MM-DD");

            const user = await createUser(email, password);


            if (typeof user === "string") {
                setLoading(false)

                return console.log(user)
            }

            const newUser = new User(user.uid, name, new Date(dateFormat), email, numericPhoneNumber, profile_photo);

            await newUser.save()

            setLoading(false)

            navigate(routes.auth.login);
        }
    }

    return <>
        <div>
            <Header titulo={"Criar conta"}/>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-column gap-2">
                <div className="flex flex-column align-items-center gap-5">
                    <div style={{position: "relative", width: 100, height: 100, margin: 16}}>
                        <div style={{
                            overflow: "hidden",
                            borderRadius: "50%",
                            backgroundColor: "#ccc",
                            width: 100,
                            height: 100
                        }}>
                            <Image preview width="100" src={profile_photo || ''} height="100"/>
                        </div>
                        <label htmlFor="image" style={{position: "absolute", bottom: -10, right: -10}}
                               className="p-button p-component p-button-icon-only p-button-rounded p-button-secondary">
                            <span className="pi pi-camera"/>
                        </label>
                    </div>

                    <input type="file" id="image" hidden accept="image/*" onChange={handleChangePhotoProfile}/>

                    <div className="flex flex-column container gap-3">
                        <label htmlFor="name">Nome Sobrenome<span className="p-error">*</span></label>
                        <InputText required id="name" name="name"/>
                    </div>
                    <div className="flex flex-column container gap-3">
                        <label htmlFor="email">Email<span className="p-error">*</span></label>
                        <InputText required id="email" name="email" type="email"/>
                    </div>
                    <div className="flex inline gap-3 justify-content-around container">
                        <div className="w-50 flex flex-column container gap-3">
                            <label htmlFor="phone">Telefone<span className="p-error">*</span></label>
                            <InputMask required size={15} id="phone" name="phone" mask="(99) 99999-9999"
                                       placeholder="(99) 99999-9999"/>
                        </div>
                        <div className="w-50 flex flex-column container gap-3">
                            <label htmlFor="date" style={{fontSize:14}}>Data de Nascimento<span className="p-error">*</span></label>
                            <InputMask required size={15} mask="99/99/9999" slotChar="dd/mm/yyyy"
                                       placeholder="dd/mm/yyyy"
                                       id="date" name="date"/>
                        </div>
                    </div>
                        <div className="flex flex-column gap-3">
                            <label htmlFor="password">Senha<span className="p-error">*</span></label>
                            <Password minLength={6}  required name="password" toggleMask  />
                        </div>
                    <div className="flex flex-column align-items-center">

                        <Button size="small" loading={loading} label="Criar Conta" rounded/>
                        <Link
                            className="p-button p-button-text p-button-secondary flex justify-content-center font-bold"
                            to={routes.auth.login}>Já tenho uma conta</Link>
                    </div>
                </div>
            </form>
        </div>
    </>
}

export default Register;