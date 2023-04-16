import {ContainerWindowFooter, DataParticipant, TitleWindow} from "./styles/FooterEdit";
import {BsPersonCircle as IconPerson} from "react-icons/bs";
import {ParticipantType, routeParams} from "../types/types";
import moment from "moment";
import {IoLogoWhatsapp as IconeWpp} from "react-icons/io";
import {database, ref, remove, update} from "../FirebaseService";
import {Link, useParams} from "react-router-dom";
import LoadingPage from "../Pages/LoadingPage";
import {ButtonCancel, ButtonSave, ContainerButtons} from "./styles/Form";
import {BsXCircleFill as IconClose} from "react-icons/bs";
import {useState} from "react";


interface Props {
    participant: ParticipantType | undefined
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const FooterEdit = ({participant, setVisible}: Props) => {

    const {idEvent, idCategory} = useParams<routeParams>();

    const [visibleLoading, setVisibleLoading] = useState(false);

    const handleDeleteParticipants = async (idParticipants: string | undefined) => {
        setVisibleLoading(true)
        await remove(ref(database, `events/${idEvent}/categories/${idCategory}/participants/${idParticipants}`)).then(() => {
            setVisibleLoading(false)
        })
        setVisible(false);

        return;
    }

    const handleConfirmParticipants = async (idParticipants: string | undefined) => {
        setVisibleLoading(true)
        const actualization = {status: 1};

        await update(ref(database, `events/${idEvent}/categories/${idCategory}/participants/${idParticipants}`), actualization).then(() => {
            setVisibleLoading(false)
        });
        setVisible(false);

        return;
    }

    return <>
        <ContainerWindowFooter>
            {visibleLoading && <LoadingPage/>}
            {!visibleLoading && <>
                <TitleWindow>Edição <IconClose onClick={() => {
                    setVisible(false)
                }}/></TitleWindow>
                <DataParticipant>
                    <IconPerson size={50}/>
                    <div>
                        <p><b>Nome : </b>{participant?.nomeSobrenome}</p>
                        <p><b>Idade : </b>{moment().diff(moment(participant?.dtaNascimento), 'y')} anos</p>
                        <p><b>Data de Nascimento : </b>{moment(participant?.dtaNascimento).format('DD/MM/yyyy')}</p>
                        <Link style={{textDecoration:'none',}} to={`https://Wa.me/55${participant?.telefone.replace(/[-()!]/g,"")}`}>
                        <p><b>Telefone :</b> {participant?.telefone} <IconeWpp color={'#a4c639'}/></p>

                        </Link>
                    </div>
                </DataParticipant>
                <ContainerButtons>
                    <ButtonCancel
                        onClick={() => handleDeleteParticipants(participant?.idParticipants)}>Cancelar</ButtonCancel>
                    <ButtonSave
                        onClick={() => handleConfirmParticipants(participant?.idParticipants)}>Confirmar</ButtonSave>
                </ContainerButtons>
            </>}
        </ContainerWindowFooter>
    </>
}