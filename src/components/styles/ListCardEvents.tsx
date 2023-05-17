import styled from "styled-components";

interface PropsContainerCard {
    active ?: 1 | 0.6
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
    border-radius: 15px;
    box-shadow: 10px 5px 5px grey;
    flex-direction: column;
    align-items: center;
    opacity: ${props=>props.active}; 
    cursor: pointer;
`;

export const TituloCard = styled.p`
    color: #FFFFFF;
    font-size: 23px;
    font-weight: bold;
`;

export const CardImage = styled.div`
    > img {
        max-height: 300px;
        width: 100%;
        border-radius: 15px 15px 0 0;
        transition: all 100ms ease-in-out;
        object-fit: cover;
    }

    img:hover{
        transform:translate(-3%,3%) scale(1.2);
    }
    
    border-radius: 15px 15px 0px 0px;
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

export const LabelStatusEvent = styled.div<{ status: number}>`
    display: flex;
    justify-content: center;
    width: max-content;
    border-radius: 32px;
    padding: 5px;
    padding-left: 12px;
    padding-right: 12px;
    background-color: ${props => (props.status === 0) ? "#198754" : (props.status === 1) ? "#727775" : (props.status === 2) ? "#ef2020" : "#f79103"};
`;

export const ContainerButtonADDEvent = styled(ContainerCard)`
    justify-content: center;
    align-items: center;
`;
