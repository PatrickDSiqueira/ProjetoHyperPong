import styled from "styled-components";
import { typeMessage } from "../../types/types";


export const ContainerMessage = styled.span<{type:typeMessage}>`
    position: fixed;
    left: 50%;
    top: 30px;
    transform: translate(-50%, -50%);
    padding: 1em;
    border: 1px solid #000;
    text-align: center;
    border-radius: 5px;
    width: max-content;
    color: ${props=>props.type === "success" ? '#155724' : props.type==="error" ?'#c91c2e':'#000'} ;
    background-color: ${props=>props.type === "success" ? '#d4edda' : props.type === "error" ? '#f8d7da':'#d36b09'};
    border-color:${props=>props.type === "success" ? '#c3e6cb' : props.type === "error"? '#f5c6cb':'#000'} ;
    font-weight: bolder;
    animation: alertMoviment .4s;

    display: block;
    white-space: normal;
    
    margin-top: 30px;
    max-width: 80%;

    @keyframes alertMoviment {
        from {
            top: -68px;
        }
        to {
            top: 30px;
        }
        
    }
`;