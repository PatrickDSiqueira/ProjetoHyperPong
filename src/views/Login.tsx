import React, {useRef, useState} from "react";
import {auth, browserLocalPersistence, setPersistence, signInWithEmailAndPassword} from "../FirebaseService";
import Header from "../components/Header";
import {ImageTitle} from "../components/styles/Form";
import logo from "../images/logo.png";
import {Link, useNavigate} from "react-router-dom";
import {routes} from "../routes/Routes";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

const Login = () => {

    const navigate = useNavigate();

    const formRef = useRef<HTMLFormElement>(null);

    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        setLoading(true)

        event.preventDefault();

        if (formRef.current) {

            const formData = new FormData(formRef.current);
            const values = Object.fromEntries(formData.entries());

            const {email, password} = values;
            await setPersistence(auth, browserLocalPersistence)
                .then(async () => await signInWithEmailAndPassword(auth, email.toString(), password.toString()))
                .catch((e) => {
                    setLoading(false)
                    console.log(e.code, e.message)
                })

            return navigate(routes.user.perfil);
        }
    }

    return <>
        <div>
            <Header titulo={"Login Admin"}/>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-column gap-2">
                <div style={{display: "flex", justifyContent: "center"}}>
                    <ImageTitle src={logo} alt=""/>
                </div>
                <div className="flex flex-column container gap-3">
                    <label htmlFor="email">Email:</label>
                    <InputText type="email" id="email" name="email" required/>
                </div>
                <div className="flex flex-column container gap-3">
                    <label htmlFor="password">Password:</label>
                    <InputText type="password" id="password" name="password" required/>
                </div>
                <div className="flex flex-column container">
                    <Button loading={loading} type="submit" severity="success" label="Login"/>
                    <Link
                        className="text-decoration-none p-button p-button-text p-button-secondary flex justify-content-center font-bold"
                        to={routes.auth.register}>Criar conta</Link>
                </div>
            </form>
        </div>
    </>
}

export default Login;