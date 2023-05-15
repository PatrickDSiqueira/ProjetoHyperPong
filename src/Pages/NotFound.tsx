import { ConteinerNotFound, ImageError} from "./styles/NotFound"
import logo from "../images/logo.png"
import error404 from "../images/error.jpg"
import ButtonVoltar from "../components/ButtonVoltar"

export const NotFound = () =>{
    return <ConteinerNotFound>
        <img id="logo" src={logo} alt="logo"/>
        <ImageError src={error404} alt="erro 404"/>
        {/*"https://br.freepik.com/autor/stories" Imagem de storyset no Freepik*/}
        <h1>Ops! Página não encontrada</h1>
        <p>Você pode ter digitado o endereço errado ou a página não existe mais.</p>
        <ButtonVoltar></ButtonVoltar>
    </ConteinerNotFound>
}