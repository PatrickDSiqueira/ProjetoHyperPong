import {Accordion, AccordionTab} from "primereact/accordion";
import {Tag} from "primereact/tag";
import {DataTable} from "primereact/datatable";
import {Column, ColumnEditorOptions} from "primereact/column";
import {
    CategoryType,
    ParticipantType,
    routeParams,
    SeverityStatusParticipants,
    StatusPartipants
} from "../../types/types";
import React, {useState} from "react";
import {Button} from "primereact/button";
import {FaRegEdit} from "react-icons/fa";
import {Dialog} from "primereact/dialog";
import {InputNumber} from "primereact/inputnumber";
import {InputText} from "primereact/inputtext";
import {database, ref, remove, update} from "../../FirebaseService";
import {useParams} from "react-router-dom";
import {Dropdown} from "primereact/dropdown";
import {loadingStart, loadingStop} from "../../App";
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";

interface Props {
    categoryList: CategoryType[],
    updateData: () => void
}

const initialCategory: CategoryType = {
    maxParticipants: 0,
    name: "",
    participants: []
};

export default function Category({categoryList, updateData}: Props) {

    const {idEvent} = useParams<routeParams>();

    const [viewModalEdit, setViewModalEdit] = useState(false);

    const [categoryToEdit, setCategoryToEdit] = useState<CategoryType>(initialCategory);
    const [categoryToEditId, setCategoryToEditId] = useState<number>(0);

    const modalEdit = {
        show: (category: CategoryType, id: number) => {
            setCategoryToEditId(id)
            setCategoryToEdit(category);
            setViewModalEdit(true);
        },
        hide: () => setViewModalEdit(false),
    }

    const footerModalEditTemplate = () => <div>
        <Button size="small" label="Cancelar" text onClick={modalEdit.hide}/>
        <Button size="small" label="Salvar" autoFocus onClick={saveCategoryDate}/>
    </div>;

    const saveCategoryDate = async () => {

        await update(ref(database, `events/${idEvent}/categories/${categoryToEditId}`),
            {name: categoryToEdit.name, maxParticipants: categoryToEdit.maxParticipants})
            .then(modalEdit.hide);

        updateData();
    }

    const headerCategory = (category: CategoryType, categoryId: number) => {

        const {name, participants} = category;

        const counter: number[] = [];
        // const counter: { [status: string]: number } = {};

        Object.values(participants || {})
            .forEach((participant: ParticipantType) => {

                const status = parseInt(participant.status)

                if (counter[status]) {

                    counter[status]++;

                } else {

                    counter[status] = 1;
                }
            });

        return <div className="flex align-items-center gap-2 w-full">
            <span>{name}</span>
            {counter.map((value, i) => <Tag key={i} severity={SeverityStatusParticipants[i]}
                value={value}/>)}
            <Button rounded text severity="secondary" onClick={() => modalEdit.show(category, categoryId)}>
                <FaRegEdit size={24}/>
            </Button>
        </div>
    }

    const tagPlayerTemplate = (participant: ParticipantType) => {

        const status = parseInt(participant.status)

        return <Tag severity={SeverityStatusParticipants[status]}>{StatusPartipants[status]}</Tag>
    }

    const handleDeleteParticipants = async (player: ParticipantType, category: CategoryType, categoryId: number) => {

        loadingStart();

        await remove(ref(database, `events/${idEvent}/categories/${categoryId}/participants/${player.idParticipants}`))
            .then(updateData);

    }
    const deletePlayerTemplate = (player: ParticipantType, category: CategoryType, categoryId: number) => {

        const confirmDelete = () => {
            confirmDialog({
                message: () => <span>Você está certo que deseja excluir <b>{player.nomeSobrenome}</b>?</span>,
                header: "Cancelar Inscrição",
                icon: 'pi pi-exclamation-triangle',
                accept: () => handleDeleteParticipants(player, category, categoryId),
            });
        }

        return <Button icon="pi pi-trash" text severity="secondary" onClick={confirmDelete}/>
    }

    const inputSelectPaticipantEditor = (props: ColumnEditorOptions, field: string, categoryId: number, category: CategoryType) => {

        const statusId = props.rowData[field];

        const options = StatusPartipants.map((status, i) => {
            return {
                label: status,
                id: i
            }
        })

        return (
            <Dropdown
                style={{fontSize: '10px'}}
                optionLabel="label"
                value={options.find(option => option.id == statusId)}
                options={options}
                onChange={(e) => onEditorValueChange(props, e.target.value.id, categoryId, category)}
            />
        );
    };

    const onEditorValueChange = async (props: ColumnEditorOptions, newStatus: number, categoryId: number, category: CategoryType) => {

        loadingStart();

        const player: ParticipantType = props.rowData;

        await update(ref(database, `events/${idEvent}/categories/${categoryId}/participants/${player.idParticipants}`), {status: newStatus})
            .then(loadingStop);

        updateData()
    };

    return <div style={{padding: 12}}>
        <h1>Categorias</h1>
        <Accordion>
            {categoryList.map((category, categoryId) => {

                const {participants} = category;

                const data = Object.values(participants || {})

                return <AccordionTab header={headerCategory(category, categoryId)} key={categoryId}>

                    <DataTable editMode="cell" stripedRows scrollable scrollHeight="300px" size="small"
                               value={data}>
                        <Column field="nomeSobrenome" header="Player" sortable/>
                        <Column field="status"
                                header="Status"
                                sortable
                                body={tagPlayerTemplate}
                                editor={(props) => inputSelectPaticipantEditor(props, 'status', categoryId, category)}
                        />
                        <Column body={(player) => deletePlayerTemplate(player, category, categoryId)}/>
                    </DataTable>

                </AccordionTab>
            })}
        </Accordion>

        <Dialog
            header="Editar Categoria"
            visible={viewModalEdit}
            onHide={modalEdit.hide}
            footer={footerModalEditTemplate}
        >

            <div className="modal-body flex flex-column gap-4">

                <div className="flex flex-column gap-2">
                    <label htmlFor="max_participants">Max. Participantes</label>
                    <InputNumber inputId="max_participants"
                                 value={categoryToEdit?.maxParticipants}
                                 onChange={(e) => setCategoryToEdit((prevState) => ({
                                     ...prevState,
                                     maxParticipants: e.value ?? 0
                                 }))}
                                 max={50}/>
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="name">Nome</label>
                    <InputText id="name" value={categoryToEdit?.name}
                               onChange={event => setCategoryToEdit((prevState) => ({
                                   ...prevState,
                                   name: event.target.value
                               }))}/>
                </div>
            </div>
        </Dialog>

        <ConfirmDialog/>

    </div>

}