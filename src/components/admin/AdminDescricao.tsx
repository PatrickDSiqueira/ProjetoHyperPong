import React, {useState} from "react";
import {Button} from "primereact/button";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Event from "../../Model/Event";
import parse from 'html-react-parser';

import {loadingStart, loadingStop} from "../../App";
import {database, ref, update} from "../../FirebaseService";
import {ScrollPanel} from "primereact/scrollpanel";

interface Props {
    event: Event,
    updateData: () => void
}

export default function AdminDescricao({event, updateData}: Props) {

    const [isEditing, setIsEditing] = useState(false);

    const descriptionFormat = event.getDescription().split("\\n").join('<br>');

    const controlEdit = {
        isEditing: () => setIsEditing(true),
        isNotEditing: () => setIsEditing(false),
    }

    const updateDescription = async () => {

        loadingStart();

        await update(ref(database, `events/${event.getId()}`), {description: event.getDescription()})
            .then(loadingStop).catch((e) => console.log(e));

        controlEdit.isNotEditing()

        updateData()
    };

    const getEditorOrView = () => {

        if (isEditing) {

            return <><CKEditor
                config={{
                    removePlugins: ['About']
                }}
                editor={ClassicEditor}
                data={descriptionFormat}
                onChange={(_, editor) =>event.setDescription(editor.getData())}
            />

                <div style={{paddingTop: '5px'}} className="modal-footer">
                    <Button size="small" label="Cancelar" text severity="secondary" onClick={controlEdit.isNotEditing}/>
                    <Button size="small" label="Salvar" onClick={updateDescription}/>
                </div>
            </>
        }

        return <div className="card">
            <ScrollPanel onClick={controlEdit.isEditing} style={{width: '100%', height: '400px', padding: 10}}>
                {parse(event.getDescription())}
            </ScrollPanel>
        </div>
    }

    return <div style={{padding: 12}}>

        <h1>Descrição</h1>

        {getEditorOrView()}

    </div>

}