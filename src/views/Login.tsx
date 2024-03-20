import React, {useRef, useState} from "react";
import {
    auth,
    browserLocalPersistence,
    getFirebaseError,
    setPersistence,
    signInWithEmailAndPassword
} from "../FirebaseService";
import Header from "../components/Header";
import {ImageTitle} from "../components/styles/Form";
import logo from "../images/logo.png";
import {useNavigate} from "react-router-dom";
import {loadingStop} from "../App";
import {routes} from "../routes/Routes";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Password} from "primereact/password";

const Login = () => {

    const navigate = useNavigate();

    const [loginError, setLoginError] = useState('');

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
                .then(() => navigate(routes.user.admin))
                .catch((e) => {
                    setLoginError(getFirebaseError(e))
                    setLoading(false);
                })
        }
        loadingStop();
    }

    return <div>
        <Header titulo={"Login Admin"}/>
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-column gap-2">
            <div style={{display: "flex", justifyContent: "center"}}>
                <ImageTitle src={logo} alt=""/>
            </div>
            <div className="flex flex-column container gap-3">
                <label htmlFor="email">Email:</label>
                <InputText type="email" id="email" autoComplete="username" name="email" required/>
            </div>
            <div className="flex flex-column container gap-3">
                <label htmlFor="password">Password:</label>
                <Password inputStyle={{width: "100%"}} id="password" toggleMask feedback={false} autoComplete="current-password" name="password" required/>
            </div>
            <span className="p-error p-message-error flex justify-content-center">{loginError}</span>
            <div className="flex flex-column container">
                <Button loading={loading} type="submit" severity="success" label="Login"/>
            </div>
        </form>
    </div>
}

export default Login;