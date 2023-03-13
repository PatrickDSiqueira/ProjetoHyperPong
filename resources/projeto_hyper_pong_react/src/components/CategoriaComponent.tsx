import { BsFillPersonFill as IconPerson} from "react-icons/bs";
import {AiFillPlusCircle as IconPlus} from "react-icons/ai";
import {Capacidade, ContainerCategoria, TituloCategoria} from "./styles/CategoriaComponent";

 const CategoriaComponent = () =>{
    return <>
    <ContainerCategoria>
        <IconPerson  size={35}/>
        <Capacidade>14/16</Capacidade>
        <TituloCategoria>Categoria Absoluto</TituloCategoria>
        <IconPlus color={'#036537'} size={35} />
    </ContainerCategoria>
    </>
}

 export default CategoriaComponent
