import {ButtonSave, ContainerButtons, ButtonCancel} from "./styles/GroupButtonCancelSave";

const GroupButtonCancelSave = ()=>{
    return <ContainerButtons>
        <ButtonCancel type="button">Cancelar</ButtonCancel>
        <ButtonSave type="submit" >Salvar</ButtonSave>
    </ContainerButtons>
}

export default GroupButtonCancelSave;
