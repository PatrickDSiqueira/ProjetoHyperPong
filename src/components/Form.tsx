import {useNavigate} from "react-router-dom";
import {ButtonCancel, ButtonSave, ContainerButtons} from "./styles/Form";

interface GroupButtonsProps {
    model : "Login" | "Salvar"
}
const GroupButtonCancelSubmit = ({model}: GroupButtonsProps) => {

    const navigation = useNavigate();

    return <ContainerButtons>
        <ButtonCancel type="button" onClick={() => navigation(-1)}>Cancelar</ButtonCancel>
        <ButtonSave type="submit">{model}</ButtonSave>
    </ContainerButtons>
}

export default GroupButtonCancelSubmit;