import {ReactComponent as ThunderCollor} from '../Pages/ThunderCollor.svg';
import {ContainerLoadingPage} from "../Pages/styles/LoadingPage";

interface Prop {
    on ?:boolean|void,
}
const LoadingPage = ({on} : Prop) => {

    return <ContainerLoadingPage id='loading' style={{display: on ? "flex" : "none"}}>
        <ThunderCollor/>
    </ContainerLoadingPage>
}

export default LoadingPage;