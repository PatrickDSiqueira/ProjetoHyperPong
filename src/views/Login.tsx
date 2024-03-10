import React, {useRef, useState} from "react";
import {
    auth,
    browserLocalPersistence,
    getFirebaseError,
    setPersistence,
    signInWithEmailAndPassword
} from "../FirebaseService";
import Header from "../components/Header";
import {ContainerPageLogin} from "../Pages/styles/Login";
import {FormDefault, ImageTitle, InputDefault, LabelDefault} from "../components/styles/Form";
import GroupButtonCancelSubmit from "../components/Form";
import logo from "../images/logo.png";
import {loadingStart} from "../App";
import {useNavigate} from "react-router-dom";
import {routes} from "../routes/Routes";

const Login = () => {

    const navigate = useNavigate();

    const [loginError, setLoginError] = useState('');

    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        loadingStart();

        event.preventDefault();

        if (formRef.current) {

            const formData = new FormData(formRef.current);
            const values = Object.fromEntries(formData.entries());

            const {email, password} = values;
            await setPersistence(auth, browserLocalPersistence)
                .then(async () => await signInWithEmailAndPassword(auth, email.toString(), password.toString()))
                .then(() => navigate(routes.user.admin))
                .catch((e) => setLoginError(getFirebaseError(e)))
        }
    }

    return <>
        <Header titulo={"Login Admin"}/>
        <ContainerPageLogin style={{alignItems: 'center', justifyContent: 'center'}}>
            <div>
                <FormDefault ref={formRef} onSubmit={handleSubmit}>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <ImageTitle src={logo} alt=""/>
                    </div>
                    <LabelDefault htmlFor="email">Email:</LabelDefault>
                    <InputDefault type="email" id="email" autoComplete="username" name="email" required/>

                    <LabelDefault htmlFor="password">Password:</LabelDefault>
                    <InputDefault type="password" autoComplete="current-password" id="password" name="password" required/>
                    <span className="p-error p-message-error flex justify-content-center">{loginError}</span>
                    <GroupButtonCancelSubmit model={"Login"}/>
                </FormDefault>
            </div>
        </ContainerPageLogin>
    </>
}

export default Login;