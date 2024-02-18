import React, {useState} from "react";
import parse from 'html-react-parser';
import {HistoryLogs} from "./styles/ShowHistoryLogs";
import {GetAll} from "../hooks/Log";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Log} from "../types/types";
import {Accordion, AccordionTab} from "primereact/accordion";
import {Dropdown} from "primereact/dropdown";
import {FormEvent} from "primereact/ts-helpers";

export const ShowHistoryLogs = () => {

    const [filterLogs, setFilterLogs] = useState(10);

    const logsList = GetAll(filterLogs);

    const logTemplate = (log: Log) => <span style={{fontSize: '11px'}}>{parse(log.getText())}</span>

    const diffTimeTemplate = (log: Log) => <span style={{fontSize: '11px'}}>{log.getDiffTime()}</span>;

    const handleChangeRowsPerPage = (event: FormEvent) => setFilterLogs(event.target.value);
    const headerColumn = () => <span style={{display: "flex", justifyContent: "flex-end"}}> <Dropdown
        value={filterLogs}
        options={[10, 20, 50]}
        onChange={handleChangeRowsPerPage}
    /></span>;

    return <HistoryLogs>
        <Accordion>
            <AccordionTab header="Novidades">
                <DataTable value={logsList} header={false} scrollable rows={7}
                           scrollHeight='300px' size="small">
                    <Column style={{padding: 0, whiteSpace: "nowrap"}} body={diffTimeTemplate}></Column>
                    <Column header={headerColumn} body={logTemplate}></Column>
                </DataTable>
            </AccordionTab>
        </Accordion>
    </HistoryLogs>
}