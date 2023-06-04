import React, {useState} from "react";
import Logs from "../hooks/Log";
import parse from 'html-react-parser';
import {
    BsFillInfoCircleFill as IconInfo,
    BsFillExclamationCircleFill as IconError,
    BsFillCheckCircleFill as IconConfirm
} from "react-icons/bs";
import {HistoryLogs, SelectFilter, TableHistoryLog} from "./styles/ShowHistoryLogs";

export const ShowHistoryLogs = () => {

    const [filterLogs, setFilterLogs] = useState(10);
    const logsList = Logs.GetAll(20);

    return <HistoryLogs>
        <TableHistoryLog>
            <thead>
            <tr>
                <td style={{display: 'flex', justifyContent: "space-between"}}>Últimas Notícias
                    <SelectFilter onChange={(e) => setFilterLogs(parseInt(e.target.value))}>
                        <option defaultChecked value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </SelectFilter>
                </td>
            </tr>
            </thead>
            <tbody>
            {logsList.map((log, key) => {

                if (key < filterLogs) {

                    return <tr key={key}>
                        <td style={{whiteSpace: "nowrap"}}>{log.getDiffTime()}</td>
                        <td style={{marginLeft: '5px', marginRight: '5px'}}>
                            {log.getType() === 1 ? <IconConfirm color={'green'}/>
                                : log.getType() === 2 ? <IconInfo color={'blue'}/>
                                    : <IconError color={'orange'}/>}</td>
                        <td>{parse(log.getText())}</td>
                    </tr>;
                }
                return null;
            })}
            </tbody>
        </TableHistoryLog>
    </HistoryLogs>
}