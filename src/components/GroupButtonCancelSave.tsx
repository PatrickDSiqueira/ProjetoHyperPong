import {ButtonSave, ContainerButtons, ButtonCancel} from "./styles/GroupButtonCancelSave";
import {useNavigate} from "react-router-dom";

const GroupButtonCancelSave = ()=>{

    const navigation = useNavigate();

    return <ContainerButtons>
        <ButtonCancel type="button" onClick={()=>navigation(-1)}>Cancelar</ButtonCancel>
        <ButtonSave type="submit" >Salvar</ButtonSave>
    </ContainerButtons>
}

export default GroupButtonCancelSave;
