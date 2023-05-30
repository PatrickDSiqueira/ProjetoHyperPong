import React from "react";
import Logs from "../hooks/Log";
import parse from 'html-react-parser';
import {
    BsFillInfoCircleFill as IconInfo,
    BsFillExclamationCircleFill as IconError,
    BsFillCheckCircleFill as IconConfirm
} from "react-icons/bs";
import {HistoryLogs, TableHistoryLog} from "./styles/ShowHistoryLogs";

export const ShowHistoryLogs = () => {


    const logsList = Logs.GetAll();

    return <HistoryLogs>
        <TableHistoryLog>
            <thead>
            <tr>
                <td>Últimas Notícias</td>
            </tr>
            </thead>
            <tbody>
            {logsList.map((log, key) => {
                return <tr key={key}>
                    <td style={{whiteSpace: "nowrap"}}>{log.getDiffTime()}</td>
                    <td style={{marginLeft: '5px', marginRight: '5px'}}>
                        {log.getType() === 1 ? <IconConfirm color={'green'}/>
                            : log.getType() == 2 ? <IconInfo color={'blue'}/>
                                : <IconError color={'orange'}/>}</td>
                    <td>{parse(log.getText())}</td>
                </tr>;
            })}
            </tbody>
        </TableHistoryLog>

    </HistoryLogs>
}