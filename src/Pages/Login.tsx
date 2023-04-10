import {useContext, useState} from "react";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth} from "../FirebaseService";
import LoadingPage from "./LoadingPage";
import {Message} from "../components/Message";
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";
import {AuthContext, UserLogin} from "../context/AuthContext";
import {ContainerPageLogin} from "./styles/Login";


const Login = () => {
    const navigate = useNavigate();

    const {userLogin, setUser} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        if (setUser) {
            setUser(userLogado)
        }
    }


    return <>
        <Header titulo={"Login Admin"}/>
        {error && <Message type={"error"} msg={"Ocorreu um erro"}/>}
        {loading && <LoadingPage/>}
        <ContainerPageLogin>
            {userLogin && <><p>Logado</p></>}
            {!loading && !userLogin && <>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} required onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} required
                       onChange={(e) => setPassword(e.target.value)}/>
                <>
                    <button onClick={() => navigate(-1)}>Cancel</button>
                    <button onClick={() => signInWithEmailAndPassword(email, password)}>Login</button>
                </>
            </>
            }
        </ContainerPageLogin>
    </>
}

export default Login;