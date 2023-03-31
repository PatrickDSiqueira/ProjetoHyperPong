import styled from "styled-components";

export const Container = styled.div`
    height: 100px;
    display: flex;
    background-color: #1A202C;
    box-shadow: 0 0 20px 3px #1A202C;
    color: #C1FF00;

    padding-left: 32px;
     align-items: center;
    justify-content: left;

    >h1 {
        margin-left: 15px;
        font-size: 23px ;
    }

    > svg {
        cursor: pointer;
    }
`