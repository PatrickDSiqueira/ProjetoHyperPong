import React, {useContext, useEffect, useRef, useState} from "react";
import Header from "../components/Header";
import {ContainerPageCriarEvento} from "./styles/CriarEvento";
import {CategoryType, TypeCompetitions} from "../types/types";
import {child, database, push, ref, set, storage, refStorage, getDownloadURL} from "../FirebaseService";
import {useNavigate} from "react-router-dom";
import {
    ButtonCancel,
    ButtonSave,
    ContainerButtons,
    FormDefault, FormInForm,
    InputDefault,
    LabelDefault, LabelImageDefault, TextAreaDefault
} from "../components/styles/Form";
import GroupButtonCancelSubmit from "../components/Form";
import LoadingPage from "./LoadingPage";
import {useUploadFile} from 'react-firebase-hooks/storage';
import {AuthContext} from "../context/AuthContext";

export default function CriarEvento() {

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [showNewCat, setShowNewCat] = useState<boolean>(false);
    const [nameCat, setNameCat] = useState<string>();
    const [numCat, setNumCat] = useState<number>();
    const [address, setAddress] = useState('R. Maria Francisca, 915 - Boa Vista, BH - MG')
    const [description, setDescription] = useState('')
    const [type, setType] = useState();
    const [visibleLoading, setVisibleLoading] = useState(false)
    const [uploadFile] = useUploadFile()
    const [imageSelected, setImageSelected] = useState<File>();

    const {userLogin} = useContext(AuthContext);

    const navigate = useNavigate();

    function seeNewCat() {
        setShowNewCat(!showNewCat)
    }

    function deleteCategories(name: string) {
        const cats: CategoryType[] = categories.filter((category) => category.name !== name);
        setCategories(cats);
    }

    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setVisibleLoading(true);

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const values = Object.fromEntries(formData.entries());

            const {name, time, date, categoriesObj, description, status, end_date, address, type} = values;

            const categories = JSON.parse(categoriesObj.toString());

            const id = push(child(ref(database), 'events')).key;

            const wallpaper = await uploadImageEvent(`events/${id}`)

            await set(ref(database, "events/" + id), {
                id,
                name,
                date,
                time,
                description,
                status,
                end_date,
                type,
                address,
                categories,
                wallpaper
            });
            navigate(`/evento/${id}`)
            return;

        }
    }

    function createNewCat() {
        if (nameCat !== undefined && numCat !== undefined) {
            var cat: CategoryType = {
                name: nameCat,
                maxParticipants: numCat,
                participants: []
            }

            setCategories(categories => [...categories, cat])
            setNameCat("");
            setNumCat(0);
        }

        seeNewCat()
    }

    const handleSaveOptionTypeCompetition = (event: any) => {
        setType(event.target.value)
    }

    useEffect(()=>{
        if(userLogin){
            return;
        }
        navigate("/login")
    })
    const uploadImageEvent = async (rota: string) => {

        if (imageSelected) {

            const ref = await refStorage(storage, `${rota}/wallpaper.jpg`)
            await uploadFile(ref, imageSelected, {contentType: 'image/jpeg'})
            return getDownloadURL(ref);
        }
        return false;
    }

    return <>
        <Header titulo="Criar Evento"/>

        {visibleLoading && <LoadingPage/>}

        {!visibleLoading && userLogin && <ContainerPageCriarEvento>

            <FormDefault method="post" ref={formRef} onSubmit={handleSubmit}>
                <LabelDefault htmlFor="name">Nome:</LabelDefault>
                <InputDefault type="text" placeholder="Nome do Evento" id="name" name="name" required/>

                <LabelDefault htmlFor="time">Horário:</LabelDefault>
                <InputDefault type="time" placeholder="Horário" id="time" name="time" required/>

                <LabelDefault htmlFor="date">Data:</LabelDefault>
                <InputDefault type="date" placeholder="Data" id="date" name="date" required/>

                <LabelDefault htmlFor="end_date">Inscrições até:</LabelDefault>
                <InputDefault type="date" id="end_date" name="end_date" required/>

                <LabelDefault htmlFor="address">Local:</LabelDefault>
                <InputDefault type="text" placeholder="Endereço" id="address" name="address" value={address}
                              onChange={(e) => setAddress(e.target.value)} required/>

                <InputDefault type="number" id="status" name="status" hidden value={0}/>

                <LabelDefault htmlFor="">Categorias:</LabelDefault>
                <InputDefault type="text" id="categoriesObj" name="categoriesObj" hidden
                              value={JSON.stringify(categories)}/>

                <div className={categories.length ? "" : "hidden"}>
                    {
                        categories.map((elem) => {
                            return <div key={elem.name} className="labelCategoria">
                                <p>
                                    {elem.name + " - " + elem.maxParticipants}
                                    <span onClick={() => deleteCategories(elem.name)} className="deleteCategories">
                                        X
                                    </span>
                                </p>
                            </ div>
                        })
                    }
                </div>


                <div className={showNewCat ? "" : "hidden"}>
                    <FormInForm>
                        <LabelDefault>Nome:</LabelDefault>
                        <InputDefault type="text" value={nameCat} onChange={(e) => setNameCat(e.target.value)}
                               placeholder="Nome da Categoria"/>

                        <LabelDefault>Participantes:</LabelDefault>
                        <InputDefault type="number" value={numCat} onChange={(e) => setNumCat(parseInt(e.target.value))}
                               placeholder="Número de Participantes"/>

                        <ContainerButtons>
                            <ButtonCancel type="button" onClick={seeNewCat}>Cancel</ButtonCancel>
                            <ButtonSave type="button" onClick={createNewCat}>Criar</ButtonSave>
                        </ContainerButtons>
                    </FormInForm>

                </div>

                <button onClick={seeNewCat} type="button" className={!showNewCat ? "" : "hidden"}>Criar Categorias
                </button>

                <LabelDefault htmlFor="tipo">Tipo de Torneio :</LabelDefault>
                <select name="type" id="type" value={type} onChange={handleSaveOptionTypeCompetition}>
                    {TypeCompetitions.map((value, index) => {
                        return <option value={index}>{value}</option>
                    })}
                </select>

                <LabelDefault htmlFor="descriptionArea">Descrição:</LabelDefault>
                <TextAreaDefault id="descriptionArea" cols={20} rows={10} value={description}
                                 onChange={(e) => setDescription(e.target.value)}/>
                <textarea hidden name="description" cols={20} rows={10} value={JSON.stringify(description)}/>

                <LabelImageDefault hasFile={imageSelected == undefined} htmlFor="image">
                    {imageSelected ? "Capa Selecionada" : "Inserir Capa"}
                </LabelImageDefault>

                <InputDefault type="file" id="image" hidden onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : undefined
                    setImageSelected(file)
                }
                }/>

                <GroupButtonCancelSubmit model={"Salvar"}/>

            </FormDefault>
        </ContainerPageCriarEvento>
        }
    </>
}