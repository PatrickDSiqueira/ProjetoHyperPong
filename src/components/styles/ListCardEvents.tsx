import styled from "styled-components";

interface PropsContainerCard {
    active : 1 | 0.6
}

export const ContainerCard = styled.div<PropsContainerCard>`
    background-color: black;
    color: whitesmoke;
    margin-top: 12px;
    margin-left: 12px;
    display: flex;
    background-color: #000000;
    width: 18rem;
    height: auto;
    border-radius: 31px;
    flex-direction: column;
    align-items: center;
    opacity: ${props=>props.active}; 
    cursor: pointer;
`;

export const TituloCard = styled.p`
    color: #FFFFFF;
    font-size: 23px;
    font-weight: bold;
    /* text-shadow:
        -1px -1px 0px #000,
        -1px -1px 0px #000,
        -1px -1px 0px #000,
        -1px -1px 0px #000;
    font-size: 20px; */
`;
export const CardImage = styled.div`
    > img {
        width: 100%;
        border-radius: 32px 32px 0 0;
    }
    /* padding: 12px; */
    /* border-radius: 31px; */
    overflow: hidden;
`;

export const CardDesc = styled.div`
        padding: 16px;
`;

export const ListCard = styled.div`
    justify-content: center;
    display: flex;
    margin: 12px;
    flex-wrap: wrap;
`;

interface PropsLabelStatus {
    color:string
}


export const LabelStatusEvent = styled.div<PropsLabelStatus>`
    display: flex;
    justify-content: center;
    width: max-content;
    border-radius: 32px;
    padding: 5px;
    padding-left: 12px;
    padding-right: 12px;
    background-color: ${props =>props.color}


`;
