import React, {useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column, ColumnEditorOptions} from 'primereact/column';
import {GetAll} from "../hooks/Event";
import {
    EventType,
    severityStatusEvents,
    StatusEvents,
} from "../types/types";
import {Tag} from "primereact/tag";
import {Button} from "primereact/button";
import {loadingStart} from "../App";
import {database, ref, update} from "../FirebaseService";
import {CreateLog} from "../hooks/Log";
import {Link, useNavigate} from "react-router-dom";
import {Badge} from "primereact/badge";
import {Dropdown} from "primereact/dropdown";
import {GetCurrentUser} from "../context/AuthContext";

export default function TableEvents() {

    const [listening, setListening] = useState(0);

    const eventsList = GetAll(listening);

    const userLogin = GetCurrentUser();

    const navigate = useNavigate();
    const [editEvent, setEventEdit] = useState<EventType>();

    const updateData = () => setListening(listening + 1);

    const doEditEvent = (event: EventType) => {
        setEventEdit(event);
    }
    const doEditParticipants = (event: EventType) => {
        setEventEdit(event);
    }

    const handleClickChangeStatus = async (newStatus: number) => {

        loadingStart();

        await update(ref(database, `events/${editEvent?.id}`), {status: newStatus})
            .then(() => {
                CreateLog(2, `<b>${editEvent?.name}</b> - <b>${userLogin?.email}</b> atualizou o status do evento para <b>${StatusEvents[newStatus]}</b>.`);

            })
            .catch(() => {
                CreateLog(3, `<b>${editEvent?.name}</b> - Erro ao <b>${userLogin?.email}</b> tentar atualizar o status para <b>${StatusEvents[newStatus]}</b>.`);
            });

        updateData();
    }

    const statusTag = (event: EventType) => <Tag value={StatusEvents[parseInt(event.status)]}
                                                 severity={severityStatusEvents[parseInt(event.status)]}
                                                 onClick={() => doEditEvent(event)}/>
    const nameEvent = (event: EventType) => <Link style={{textDecoration: 'none', color: 'black'}}
                                                  to={`/evento/${event.id}/admin`}><span>{event.name}</span></Link>

    const players = (event: EventType) => {

        let numberParticipants = 0;

        event.categories.filter(({participants}) => participants)
            .forEach(({participants}) => {
                numberParticipants = numberParticipants + Object.values(participants).length
            })

        return <i id={"event_" + event.id} className="pi pi-users p-overlay-badge" style={{fontSize: '20px'}}
                  onClick={() => doEditParticipants(event)}>
            {numberParticipants ? <Badge value={numberParticipants}/> : ''}
        </i>
    }

    const tableHeader = (
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <span className="text-xl text-900 font-bold">Eventos</span>
            <Button icon="pi pi-plus" className="p-button-sm" severity="success" rounded raised
                    onClick={() => navigate("/evento/criar")}/>
        </div>
    );

    const inputSelectStatusEventEditor = (props: ColumnEditorOptions, field: string) => {

        const statusId = parseInt(props.rowData[field]);

        const options = StatusEvents.map((status, i) => {
            return {
                label: status,
                id: i
            }
        })

        return (
            <Dropdown
                optionLabel="label"
                value={options.find(option => option.id === statusId)}
                options={options}
                onChange={(e) => handleClickChangeStatus(e.target.value.id)}
            />
        );
    };

    return (
        <div>
            <div className="card" style={{margin: 10}}>
                <DataTable stripedRows scrollable scrollHeight="300px" value={eventsList} header={tableHeader}
                           size="small">
                    <Column field="name" header="Nome" body={nameEvent} sortable></Column>
                    <Column field="participants" header="Players" body={players}></Column>
                    <Column field="status" header="Status" body={statusTag} sortable
                            editor={(props) => inputSelectStatusEventEditor(props, 'status')}

                    ></Column>
                </DataTable>
            </div>
        </div>
    );
}
        