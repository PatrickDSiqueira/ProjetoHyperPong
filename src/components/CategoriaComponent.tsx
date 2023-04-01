import {BsFillPersonFill as IconPerson} from "react-icons/bs";
import {AiFillPlusCircle as IconPlus} from "react-icons/ai";
import {Capacidade, ContainerCategoria, TituloCategoria} from "./styles/CategoriaComponent";
import {useNavigate} from "react-router-dom";
import CategoryType from "../types/categoryType";


interface PropsComponetCategory {
    category: CategoryType
}

const CategoriaComponent = (props : PropsComponetCategory) => {
    const {category} = props;
    const navigate = useNavigate();
    return <>
        <ContainerCategoria onClick={() => navigate('/partipantes')}>
            <IconPerson size={35}/>
            <Capacidade>12/{category.maxParticipante}</Capacidade>
            <TituloCategoria>{category.nome}</TituloCategoria>
            <IconPlus color={'#036537'} size={35}/>
        </ContainerCategoria>
    </>
}

export default CategoriaComponent
