import styled from "styled-components";

export const ContainerParticipantes = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        color: darkblue;
        margin-bottom: 24px;
        margin-top: 24px;
        font-weight: bolder;
    }

    #containerLegenda {
        display: flex;
        width: 100%;
        justify-content: space-around;
    }

    .containerIcone {
        display: flex;
        align-items: center;
        > span {
            font-size: 12px;
        }
    }

    .icone {
        width: 12px;
        height: 12px;
        border-radius: 100%;
        margin-right: 8px;
    }

    #simbVerde{
        background-color: green;
    }

    #simbAmarelo {
        background-color: yellow;
    }
`;

export const ListaParticipante = styled.div`
    margin-top: 50px;
    margin-bottom: 100px;
`;

interface PropsTagParticipante {
    // statuscolor : "#6AF367" | "#F1F367"
    status : string
}

export const TagParticipante = styled.div<PropsTagParticipante>`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 32px;
    padding: 12px 12px 12px 12px;
    width: 300px;
    background-color: ${props => (props.status === "0")?"#F1F367":"#6AF367"};
    margin-top: 20px;
`;

