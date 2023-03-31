import styled from "styled-components";

interface Props{
    type : "success" | "error"
}

export const ContainerMessage = styled.div<Props>`
    position: fixed;
    left: 20%;
    top: 30px;
    width: 100%;
    padding: 1em;
    border: 1px solid #000;
    text-align: center;
    border-radius: 5px;
    width: max-content;
    color: ${props=>props.type === "success" ? '#155724' : '#c91c2e'} ;
    background-color: ${props=>props.type === "success" ? '#d4edda' : '#f8d7da'};
    border-color:${props=>props.type === "success" ? '#c3e6cb' : '#f5c6cb'} ;
    font-weight: bolder;
    animation: alertMoviment .4s;


    @keyframes alertMoviment {
        from {
            top: -68px;
        }
        to {
            top: 30px;
        }
        
    }
`;