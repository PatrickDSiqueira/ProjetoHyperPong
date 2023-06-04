import styled from "styled-components";

export const HistoryLogs = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  margin-right: 20px;
`;

export const TableHistoryLog = styled.table`
  thead {
    background-color: gray;
    color: aliceblue;
    font-size: 24px;
  }

  tbody {
    background-color: whitesmoke;

    tr {
      font-size: 11px;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 12px;
    }
  }
`;

export const SelectFilter = styled.select`
  background-color: transparent;
  border: none;
  color: #f0f0f0;

  > option {
    border: none;
    color: black;
  }
`;