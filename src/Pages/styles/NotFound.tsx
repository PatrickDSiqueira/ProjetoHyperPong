import styled from "styled-components";

export const ConteinerNotFound = styled.div`
background-color: white;
height: 100%;
width: 100%;

display: flex;
flex-direction: column;
align-items: center;

>#logo {
    width: 120px;
    height: 120px; 
    align-self: start;
    margin-left: 15px;
}

>h1 {
    width: 300px;
    color: black;
    font-weight: 1000;
    margin-top: 15px;
}

>p {
    width: 300px;
    color: black;
    margin: 5px 0px 15px 0px;
}

a:link {
    text-decoration: none;
    font-size: 10px;
}

`;

export const ImageError = styled.img`
  width: 250px;
`;