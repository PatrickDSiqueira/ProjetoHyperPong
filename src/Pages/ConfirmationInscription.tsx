import { useEffect } from "react";
import GifConfirmation from "../images/GifConfirmation.gif";
import { useNavigate, useParams } from "react-router-dom";
import { routeParams } from "../types/types";
import { Container } from "./styles/ConfirmationInscription ";

export default function ConfirmationInscription() {

    const { idEvent, idCategory } = useParams<routeParams>();

    const navigate = useNavigate();

    useEffect(() => {

        const timer = setTimeout(() => {

            navigate(`/evento/${idEvent}/categoria/${idCategory}`);

        }, 2000);

        return () => clearTimeout(timer);
    },[idCategory, idEvent, navigate]);

    return <>
        <Container>

            <img src={GifConfirmation} alt={'Imagem de confirmação'} />
            <h1>Inscrição Confirmada</h1>

        </Container>

    </>
}