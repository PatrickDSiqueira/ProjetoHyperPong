import styled from "styled-components";

interface Props {
    bg : string
}

export const ContainerCard = styled.div<Props>`
    display: flex;
    background-color: ${props => props.bg};
    width: 174px;
    height: 145px;
    border-radius: 31px;
`;

export const TituloCard = styled.p`
    color: #FFFFFF;
    text-shadow:
        -1px -1px 0px #000,
        -1px -1px 0px #000,
        -1px -1px 0px #000,
        -1px -1px 0px #000
`;
