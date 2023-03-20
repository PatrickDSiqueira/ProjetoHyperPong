import styled from "styled-components";

interface Props {
    sidebar : boolean
}

export const Container  = styled.div<Props>`
    color: #C1FF00 ;
    background-color: #171923;
    position: fixed;
    height: 100%;
    top: 0px;
    left: 0px;
    width: 300px;
    left: ${props => props.sidebar ? '0' : '-100%'};
    animation: showSidebar .4s;

    >svg {
        width: 30px;
        height: 30px;
        margin-top: 32px;
        margin-left: 32px;
        cursor: pointer;
    }

    @keyframes showSidebar {
        from {
            opacity: 0;
            width: 0;
        }
        to {
            opacity: 1;
            width: 300px;
        }

    }
`;
export const ContinerHeader = styled.div`
    margin-left: 32px;
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: left;

    > svg {
        cursor: pointer;
    }

    >h1{
        margin-left: 50px;
    }
`;


export const Content  = styled.div`
    margin-top: 100px;
    padding-left: 32px;

    >a{
        text-decoration: none;
        cursor: pointer;

        >p{
            padding-top: 24px;
            font-size: 24px;
            color: #FFFFFF;

        }
    }
`;
