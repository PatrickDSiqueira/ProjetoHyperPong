import React from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {ModalCreatePlayer} from "./ModalCreateOrEditPlayer";
import Player from "../Model/Player";
import {GetAll} from "../hooks/Players";
import {EditScore} from "./EditScore";
import {GetOnlyAttributes} from "../hooks/Event";
import {InputText} from "primereact/inputtext";

interface CellEditOptions {
    field: string;
    value: any;
    rowData: Player;
}


export default function UserList() {

    const players: Player[] = GetAll();

    const events = GetOnlyAttributes(['id', 'name', 'date']);

    const tableHeader = (
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <span className="text-xl text-900 font-bold">Users</span>
            <ModalCreatePlayer/>
        </div>
    );

    const templateScoreUsers = (player: Player) => <EditScore player={player} events={events} />;

    const onCellEditComplete = (options :CellEditOptions) => options.rowData.save()

    const textEditor = (options:any) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} onKeyDown={(e) => e.stopPropagation()} />;
    };

    return (

        <div>
            <div className="card" style={{margin: 10}}>
                <DataTable stripedRows scrollable scrollHeight="300px" value={players} header={tableHeader}
                           size="small">
                    <Column field="name" header="Player" editor={textEditor} onCellEditComplete={onCellEditComplete}></Column>
                    <Column field="score" header="Points" body={templateScoreUsers} sortable></Column>
                </DataTable>
            </div>
        </div>
    );
}
