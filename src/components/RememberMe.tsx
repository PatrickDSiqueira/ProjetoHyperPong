import {ContainerRememberMe} from "./styles/RememberMe";
import firebase from "firebase/compat";

interface  Props {
    setValue : React.Dispatch<React.SetStateAction<boolean>>

}

const RememberMe = ({setValue}:Props) => {

    return <ContainerRememberMe>
        <label htmlFor="inputRememberMe">Lembrar de Mim</label>
        <input type="checkbox" id="inputRememberMe" onChange={(e)=>{setValue(e.target.checked)}} />
        </ContainerRememberMe>
        }

export default RememberMe;
