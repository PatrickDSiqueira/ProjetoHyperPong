import React, {useEffect, useState} from 'react';
import {Texts} from "../trans/texts";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Image} from "primereact/image";

interface UploadWallpaperProps {
    selectedImage: File | null,
    handleChangeImage?: (target: (EventTarget & HTMLInputElement)) => void
}

export default function UploadWallpaper({selectedImage, handleChangeImage}: UploadWallpaperProps) {

    const [visible, setVisible] = useState(false);

    const [imagePreview, setImagePreview] = useState<string>();

    useEffect(() => {

        if (selectedImage) {

            const reader = new FileReader();

            reader.onloadend = () => {
                if (typeof reader.result === 'string') { // Verificando se o resultado é uma string
                    setImagePreview(reader.result);
                }
            };
            reader.readAsDataURL(selectedImage);
        }
    }, [selectedImage]);

    const openInputModal = () => document.getElementById('image-input')?.click();

    return <>
        <Button type="button" size="small" label="Capa" icon="pi pi-external-link" onClick={() => setVisible(true)}
        outlined={!selectedImage}/>

        <Dialog visible={visible} modal header={Texts.wallpaper}
                style={{width: '50rem'}}
                onHide={() => setVisible(false)}
        >
            <div className="modal-content">

                <input type="file" required id="image-input" accept="image/*"
                       onChange={({target}) => handleChangeImage
                           ? handleChangeImage(target) : null}
                       hidden/>

                <div className="flex flex-column justify-content-center align-items-center p-dialog-content">
                    <Image src={imagePreview} alt="Image" width="250" preview/>
                </div>

                <div className="flex flex-column justify-content-center align-items-center p-dialog-content">

                    <Button onClick={openInputModal} icon={selectedImage ? 'pi pi-sync' : 'pi pi-upload'}
                            label={selectedImage ? 'Alterar' : 'escolher'}/>
                </div>
            </div>
        </Dialog>
    </>

}
        