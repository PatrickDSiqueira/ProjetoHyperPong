import {ButtonSelect, ContainerWindowFooter, DataParticipant} from "./styles/FooterEdit";
import {BsPersonCircle as IconPerson} from "react-icons/bs";
import {ParticipantType, routeParams} from "../types/types";
import moment from "moment";
import {IoLogoWhatsapp as IconeWpp} from "react-icons/io";
import {database, ref, remove, update} from "../FirebaseService";
import {Link, useParams} from "react-router-dom";
import LoadingPage from "../Pages/LoadingPage";
import {ContainerButtons} from "./styles/Form";
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

    const handleSetWaitParticipants = async (idParticipants: string | undefined) => {
        setVisibleLoading(true)
        const actualization = {status: "0"};

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
                <IconClose onClick={() => {
                    setVisible(false)
                }}/>
                <DataParticipant>
                    <IconPerson size={50}/>
                    <div style={{
                        display: "flex", flexDirection: "column",
                        alignItems: "flex-start"
                    }}>
                        <p><b>Nome : </b>{participant?.nomeSobrenome}</p>
                        <p><b>Idade : </b>{moment().diff(moment(participant?.dtaNascimento), 'y')} anos</p>
                        <p><b>Data de Nascimento : </b>{moment(participant?.dtaNascimento).format('DD/MM/yyyy')}</p>
                        <Link style={{textDecoration: 'none',}}
                              to={`https://Wa.me/55${participant?.telefone.replace(/[-()!]/g, "")}`}>
                            <p><b>Telefone :</b> {participant?.telefone} <IconeWpp color={'#a4c639'}/></p>
                        </Link>
                    </div>
                </DataParticipant>
                <ContainerButtons>
                    <ButtonSelect select={participant?.status.toString() === "0"}
                                  onClick={() => handleSetWaitParticipants(participant?.idParticipants)}>
                        Aguardando
                    </ButtonSelect>
                    <ButtonSelect select={participant?.status === ""}
                                  onClick={() => handleDeleteParticipants(participant?.idParticipants)}>
                        Cancelar
                    </ButtonSelect>
                    <ButtonSelect select={participant?.status.toString() === "1"}
                                  onClick={() => handleConfirmParticipants(participant?.idParticipants)}>
                        Confirmado
                    </ButtonSelect>
                </ContainerButtons>
            </>}
        </ContainerWindowFooter>
    </>
}