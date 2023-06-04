import React, {useContext, useRef} from "react";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth} from "../FirebaseService";
import {Message} from "../components/Message";
import Header from "../components/Header";
import {AuthContext} from "../context/AuthContext";
import {ContainerPageLogin} from "./styles/Login";
import {FormDefault, ImageTitle, InputDefault, LabelDefault} from "../components/styles/Form";
import GroupButtonCancelSubmit from "../components/Form";
import logo from "../images/logo.png";
import {ShowHistoryLogs} from "../components/ShowHistoryLogs";
import {loadingStart, loadingStop} from "../App";

const Login = () => {

    const {userLogin, setUser} = useContext(AuthContext);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    if (user) {
        const userLogado = {
            uid: user.user.uid,
            email: user.user.email || ""
        }

        localStorage.setItem('user', JSON.stringify(userLogado));

        if (setUser) {
            setUser(userLogado);
        }
    }
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        if (formRef.current) {

            const formData = new FormData(formRef.current);
            const values = Object.fromEntries(formData.entries());
            const {email, password} = values;
            await signInWithEmailAndPassword(email.toString(), password.toString())

            return window.location.reload();
        }

        return;
    }

    async function handleLogout() {

        if (setUser) {

            setUser(undefined);
            await localStorage.removeItem('user');
        }

        return;
    }

    if (loading) {
        loadingStart();
    } else {
        loadingStop();
    }

    return <>
        <Header titulo={"Login Admin"}/>
        {error && <Message type={"error"} msg={"Ocorreu um erro"}/>}
        {user && <Message type={"success"} msg={"Logado"}/>}
        <ContainerPageLogin style={!userLogin ? {alignItems: 'center', justifyContent: 'center'} : {display: 'flex'}}>
            {userLogin && <>
                <p style={{marginLeft: '12px'}}>Olá, você está logado como {userLogin.email} <span
                    style={{color: 'blue', fontWeight: 'bolder'}} onClick={handleLogout}>Clique Aqui</span> para
                    finalizar a seção</p>
                <ShowHistoryLogs/>
            </>}
            {!loading && !userLogin && <>
                <div>
                    <FormDefault ref={formRef} onSubmit={handleSubmit}>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <ImageTitle src={logo} alt=""/>
                        </div>
                        <LabelDefault htmlFor="email">Email:</LabelDefault>
                        <InputDefault type="email" id="email" name="email" required/>

                        <LabelDefault htmlFor="password">Password:</LabelDefault>
                        <InputDefault type="password" id="password" name="password" required/>
                        <GroupButtonCancelSubmit model={"Login"}/>
                    </FormDefault>
                </div>

            </>
            }
        </ContainerPageLogin>
    </>
}

export default Login;