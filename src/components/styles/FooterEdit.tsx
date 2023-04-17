import styled from "styled-components";

export const ContainerWindowFooter = styled.div`
  position: fixed;
  bottom:0;
  text-align: center;
  border-radius: 5px;
  width: 100vw;
  height: 267px;
  color: #155724;
  background-color:#d4edda;
`;

export const DataParticipant = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
`;

export const ButtonSelect = styled.button<{ select?: boolean }>`
  padding: 5px 12px 5px 12px;
  border-radius: 12px;
  color: ${props => (props.select) ? "#fff" : "#155724"};
  font-weight: lighter;
  border: #155724 1px solid;
  background-color: ${props => (props.select) ? "#155724" : "rgba(0,0,0,0)"};
`;