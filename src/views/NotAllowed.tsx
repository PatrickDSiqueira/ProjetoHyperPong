import { ConteinerNotFound} from "../Pages/styles/NotFound"
import logo from "../images/logo.png"
import image from "../images/not_allowed.jpg"
import {useNavigate} from "react-router-dom";
import ButtonVoltar from "../components/ButtonVoltar";

export const NotAllowed = () =>{

    const navigate = useNavigate();

    return <ConteinerNotFound>
        <img id="logo" src={logo} alt="logo"/>
        <img src={image} style={{width: 300}} alt="erro 404"/>
        <h1>Você não tem permissões para acessar esse conteúdo.</h1>
        <ButtonVoltar></ButtonVoltar>    </ConteinerNotFound>
}