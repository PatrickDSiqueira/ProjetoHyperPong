import React, { useRef, useState} from "react";
import Header from "../components/Header";
import {ContainerPageCriarEvento} from "./styles/CriarEvento";
import {TypeCompetitions} from "../types/types";
import {child, database, push, ref, set} from "../FirebaseService";
import {useNavigate} from "react-router-dom";
import {
    ButtonCancel,
    ButtonSave,
    ContainerButtons,
    FormDefault, FormInForm,
    InputDefault,
    LabelDefault, TextAreaDefault
} from "../components/styles/Form";
import GroupButtonCancelSubmit from "../components/Form";


export default function CriarEvento() {

    interface Categoria {
        nome: string,
        maxParticipante: number
    }

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [showNewCat, setShowNewCat] = useState<boolean>(false);
    const [nomeCat, setNomeCat] = useState<string>();
    const [numCat, setNumCat] = useState<number>();
    const [local, setLocal] = useState('R. Maria Francisca, 915 - Boa Vista, BH - MG')
    const [descricao, setDescricao] = useState('')
    const [tipo, setTipo] = useState();
    const navigate = useNavigate();

    function seeNewCat() {
        setShowNewCat(!showNewCat)
    }

    function deleteCategoria(nome: string) {
        const cats: Categoria[] = categorias.filter((categoria) => categoria.nome !== nome);
        setCategorias(cats);
    }

    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const values = Object.fromEntries(formData.entries());
            
            const {nomeEvento, horario, data, categorias, descricao, status, prazo, local, tipo} = values;

            const categoriasObj = JSON.parse(categorias.toString());

            const id = push(child(ref(database), 'events')).key;

            await set(ref(database, "events/" + id), {
                id,
                nomeEvento,
                data,
                horario,
                descricao,
                status,
                prazo,
                tipo,
                local,
                categoriasObj
            });
            navigate(`/evento/${id}`)
            return;

        }


    }

    function createNewCat() {
        if (nomeCat !== undefined && numCat !== undefined) {
            var cat: Categoria = {
                nome: nomeCat,
                maxParticipante: numCat
            }

            setCategorias(categorias => [...categorias, cat])
            setNomeCat("");
            setNumCat(0);
        }

        seeNewCat()
    }

    const handleSaveOptionTypeCompetition = (event: any) => {
        console.log(event.target.value)
        setTipo(event.target.value)
    }

    return <>
        <Header titulo="Criar Evento"/>

        <ContainerPageCriarEvento>

            <FormDefault method="post" ref={formRef} onSubmit={handleSubmit}>
                <LabelDefault htmlFor="nomeEvento">Nome:</LabelDefault>
                <InputDefault type="text" placeholder="Nome do Evento" id="nomeEvento" name="nomeEvento" required />

                <LabelDefault htmlFor="horario">Horário:</LabelDefault>
                <InputDefault type="time" placeholder="Horário" id="horario" name="horario" required />

                <LabelDefault htmlFor="data">Data:</LabelDefault>
                <InputDefault type="date" placeholder="Data" id="data" name="data" required />

                <LabelDefault htmlFor="prazo">Inscrições até:</LabelDefault>
                <InputDefault type="date" id="prazo" name="prazo" required />

                <LabelDefault htmlFor="local">Local:</LabelDefault>
                <InputDefault type="text" placeholder="Endereço" id="local" name="local" value={local}
                       onChange={(e) => setLocal(e.target.value)} required />

                <LabelDefault htmlFor="">Categorias:</LabelDefault>
                <InputDefault type="text" id="categorias" name="categorias" hidden value={JSON.stringify(categorias)}/>
                <InputDefault type="number" id="status" name="status" hidden value={0}/>

                <div className={categorias.length ? "" : "hidden"}>
                    {
                        categorias.map((elem) => {
                            return <div key={elem.nome} className="labelCategoria">
                                <p>{elem.nome + " - " + elem.maxParticipante}<span
                                    onClick={() => deleteCategoria(elem.nome)} className="deleteCategorias">X</span></p>
                            </ div>
                        })
                    }
                </div>


                <div className={showNewCat ? "" : "hidden"}>
                    <FormInForm>
                        <LabelDefault>Nome:</LabelDefault>
                        <InputDefault type="text" value={nomeCat} onChange={(e) => setNomeCat(e.target.value)}
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
                <select name="tipo" id="tipo" value={tipo} onChange={handleSaveOptionTypeCompetition}>
                    {TypeCompetitions.map((value, index) => {
                        return <option value={index}>{value}</option>
                    })}
                </select>

                <LabelDefault htmlFor="descricao">Descrição:</LabelDefault>
                <TextAreaDefault id="descricao" cols={20} rows={10} value={descricao}
                          onChange={(e) => setDescricao(e.target.value)}/>
                <textarea hidden name="descricao" cols={20} rows={10} value={JSON.stringify(descricao)}/>

                <GroupButtonCancelSubmit model={"Salvar"}/>
            </FormDefault>
        </ContainerPageCriarEvento>
    </>
}