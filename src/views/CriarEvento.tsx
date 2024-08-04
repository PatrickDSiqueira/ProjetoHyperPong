import React, {useRef, useState} from "react";
import Header from "../components/Header";
import {TypeCompetitions} from "../types/types";
import {storage, refStorage, getDownloadURL} from "../FirebaseService";
import {useNavigate} from "react-router-dom";
import {useUploadFile} from 'react-firebase-hooks/storage';
import {GetCurrentUser} from "../context/AuthContext";
import {Texts} from "../trans/texts";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import Event from "../Model/Event";
import CreateCategory from "../components/CreateCategory";
import {Category} from "../types/Category";
import UploadWallpaper from "../components/UploadWallpaper";
import CreateDescription from "../components/CreateDescription";
import {CreateLog} from "../hooks/Log";
import {loadingStart, loadingStop} from "../App";
import {Message} from "primereact/message";

interface DataEvent {
    [key: string]: any;
}

export default function CriarEvento() {

    const [dataEvent, setDataEvent] = useState<DataEvent>({status: 0});

    const [errors, setErrors] = useState<string[]>([])

    const handleChangeEventData = (key: string, value: any) => {
        setErrors([]);
        setDataEvent(
            (prevState) => ({...prevState, [key]: value}));
    }

    function getDataEvent(key: string) {

        return dataEvent[key] ?? undefined;
    }

    const getDescriptionData = (): string => {

        const description = getDataEvent('description');

        return description ?? '';
    }

    function getCategoriesEventData(): Category[] {

        const categories = getDataEvent('categories');

        if (!categories || !Array.isArray(categories)) {

            return [];
        }

        return categories;
    }

    const [uploadFile] = useUploadFile()

    const userLogin = GetCurrentUser();

    const navigate = useNavigate();

    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        loadingStart();

        const wallpaper = await uploadImageEvent(`events/dsadasd`)

        const {name, time, date, description, end_date, address, type, categories} = dataEvent;

        const newEvent = new Event(
            name, address, date, time, description, wallpaper, type, end_date, categories
        );

        const result = await newEvent.processSave();

        if (result.ok) {

            loadingStop();
            navigate(`/evento/${newEvent.getId()}`)
            await CreateLog(1, `<b>${userLogin?.email}</b> -  criou o evento <b>${name}</b> .`);

            return;
        }

        loadingStop();

        setErrors(result.errors)
    }

    const setCategories = (categoriesList: Category[]) => handleChangeEventData('categories', categoriesList);

    const uploadImageEvent = async (rota: string) => {

        const ref = await refStorage(storage, `${rota}/wallpaper.jpg`)
        await uploadFile(ref, getDataEvent('wallpaper'), {contentType: 'image/jpeg'})
        return getDownloadURL(ref);
    }

    const handleChangeImage = ({files}: EventTarget & HTMLInputElement) => {

        if (files) {

            handleChangeEventData('wallpaper', files.item(0));
        }
    };

    const handleChangeDescription = (data: string) => handleChangeEventData('description', data);

    return <>

        <Header titulo="Criar Evento"/>

        <div className="flex flex-column justify-content-center align-items-center">

            <form method="post" ref={formRef} onSubmit={handleSubmit}>

                <div className="flex flex-column gap-2" style={{marginTop: 10}}>
                    <label className="form-label" htmlFor="event-name">{Texts.name} :</label>
                    <InputText id="event-name" required placeholder="Nome do Evento" name="name"
                               value={getDataEvent('name')}
                               onChange={({target}) => handleChangeEventData(target.name, target.value)}/>
                </div>

                <div className="flex flex-column gap-2" style={{marginTop: 10}}>
                    <label className="form-label" htmlFor="event-time">{Texts.time} :</label>
                    <Calendar timeOnly id="event-time" placeholder="00:00" required name="time"
                              value={getDataEvent('time')}
                              onChange={({target}) => handleChangeEventData(target.name, target.value)}/>
                </div>

                <div className="flex flex-column gap-2" style={{marginTop: 10}}>
                    <label className="form-label" htmlFor="event-date">{Texts.date} :</label>
                    <Calendar id="event-date" required name="date" minDate={new Date()} dateFormat="dd/mm/yy"
                              value={getDataEvent('date')}
                              onChange={({target}) => handleChangeEventData(target.name, target.value)}/>
                </div>

                <div className="flex flex-column gap-2" style={{marginTop: 10}}>
                    <label className="form-label" htmlFor="event-end-date">{Texts.end_date_event} :</label>
                    <Calendar id="event-end-date" required name="end_date" minDate={new Date()} maxDate={getDataEvent('date')}
                              dateFormat="dd/mm/yy" value={getDataEvent('end_date')}
                              onChange={({target}) => handleChangeEventData(target.name, target.value)}/>
                </div>

                <div className="flex flex-column gap-2" style={{marginTop: 10}}>
                    <label className="form-label" htmlFor="event-adress">{Texts.address} :</label>
                    <InputText id="event-adress" required placeholder="Endereço" name="address"
                               value={getDataEvent('address')}
                               onChange={({target}) => handleChangeEventData(target.name, target.value)}/>
                </div>

                <div className="flex flex-column gap-2" style={{marginTop: 10}}>
                    <label className="form-label" htmlFor="event-tournament-type">{Texts.tournament_type} :</label>
                    <Dropdown id="event-tournament-type" required placeholder={Texts.tournament_type} name="type"
                              options={TypeCompetitions.map((label, id) => {
                                  return {id, label}
                              })}
                              value={getDataEvent('type')}
                              onChange={({target}) => handleChangeEventData(target.name, target.value)}/>
                </div>

                <div className="flex gap-3 custom-responsive-direction" style={{marginTop: 10, marginBottom: 10}}>

                    <CreateCategory categories={getCategoriesEventData()} setCategories={setCategories}/>

                    <UploadWallpaper selectedImage={getDataEvent('wallpaper')} handleChangeImage={handleChangeImage}/>

                    <CreateDescription description={getDescriptionData()} handleChangeDescription={handleChangeDescription}/>

                </div>

                <div className="flex flex-wrap flex-column align-items-center justify-content-center gap-3">
                    {errors.map(item => <Message severity="info" text={item}/>)}
                </div>

                <Button label={Texts.create} type="submit" severity="success" style={{width: '100%'}}/>
            </form>
        </div>
    </>
}