import styled from "styled-components";

interface Props {
    bg : string
}

export const ContainerCard = styled.div<Props>`
    margin-top: 12px;
    display: flex;
    background-color: ${props => props.bg};
    width: 250px;
    height: 170px;
    border-radius: 31px;
    flex-direction: column;
    align-items: center;
`;

export const TituloCard = styled.p`
    color: #FFFFFF;
    text-shadow:
        -1px -1px 0px #000,
        -1px -1px 0px #000,
        -1px -1px 0px #000,
        -1px -1px 0px #000;
    font-size: 20px;
`;
