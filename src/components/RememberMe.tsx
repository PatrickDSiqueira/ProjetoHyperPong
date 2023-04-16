import {ContainerRememberMe} from "./styles/RememberMe";

interface  Props {
    setValue : React.Dispatch<React.SetStateAction<boolean>>
    value: boolean

}

const RememberMe = ({setValue, value}: Props) => {

    return <ContainerRememberMe>
        <label htmlFor="inputRememberMe">Lembrar de Mim</label>
        <input type="checkbox" id="inputRememberMe" checked={value} onChange={(e) => {
            setValue(e.target.checked)
        }}/>
        </ContainerRememberMe>
        }

export default RememberMe;
