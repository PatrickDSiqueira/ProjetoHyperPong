import React, {useState} from 'react';
import {Texts} from "../trans/texts";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from 'html-react-parser';
import {ScrollPanel} from "primereact/scrollpanel";

interface UploadWallpaperProps {
    description: string,
    handleChangeDescription: (data: string) => void
}

export default function CreateDescription({handleChangeDescription, description}: UploadWallpaperProps) {

    const [visible, setVisible] = useState(false);
    const [preview, setPreview] = useState(false);

    const footer = () => {
        if (preview) {
            return <Button link onClick={() => setPreview(false)}>Editar</Button>
        }
        return <Button link onClick={() => setPreview(true)}>preview</Button>
    }

    return <>
        <Button type="button" size="small" label={Texts.description} icon="pi pi-external-link" onClick={() => setVisible(true)}
        outlined={!description}/>

        <Dialog header={Texts.description} visible={visible} className="custom-responsive-width-modal" onHide={() => setVisible(false)}
                footer={footer}>
            <div className="modal-content">

                {!preview && <div style={{height: '400px'}}>

                    <CKEditor
                        config={{
                            removePlugins: ['About'],
                        }}
                        editor={ClassicEditor}
                        data={description}
                        onChange={(_, editor) => handleChangeDescription(editor.getData())}
                    />
                </div>}
                {preview && <ScrollPanel style={{width: '100%', height: '400px', padding: 10}}>
                    {parse(description)}
                </ScrollPanel>}
            </div>

        </Dialog>
    </>

}
        