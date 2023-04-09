import {useEffect, useState} from "react";
import GroupButtonCancelSave from "../components/GroupButtonCancelSave";
import Header from "../components/Header";
import {ButtonCancel, ButtonSave} from "../components/styles/GroupButtonCancelSave";
import {ContainerPageCriarEvento} from "./styles/CriarEvento";
import {TypeCompetitions} from "../types/types";


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

    function seeNewCat() {
        setShowNewCat(!showNewCat)
    }

    function deleteCategoria(nome: string) {
        const cats: Categoria[] = categorias.filter((categoria) => categoria.nome !== nome);
        setCategorias(cats);
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

    const handleSaveOptionTypeCompetition = (event:any)=>{
        console.log(event.target.value)
        setTipo(event.target.value)
    }

    return <>
        <Header titulo="Criar Evento"/>


        <ContainerPageCriarEvento>

            <form action={`${process.env.REACT_APP_BACKEND}api/admin/events`} method="post">
                <label htmlFor="nomeEvento">Nome:</label>
                <input type="text" placeholder="Nome do Evento" id="nomeEvento" name="nomeEvento"/>

                <label htmlFor="horario">Horário:</label>
                <input type="time" placeholder="Horário" id="horario" name="horario"/>

                <label htmlFor="data">Data:</label>
                <input type="date" placeholder="Data" id="data" name="data"/>

                <label htmlFor="prazo">Inscrições até:</label>
                <input type="date" id="prazo" name="prazo"/>

                <label htmlFor="local">Local:</label>
                <input type="text" placeholder="Endereço" id="local" name="local" value={local}
                       onChange={(e) => setLocal(e.target.value)}/>

                <label htmlFor="">Categorias:</label>
                <input type="text" id="categorias" name="categorias" hidden value={JSON.stringify(categorias)}/>
                <input type="number" id="status" name="status" hidden value={0}/>

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
                    <input type="text" value={nomeCat} onChange={(e) => setNomeCat(e.target.value)}
                           placeholder="Nome da Categoria"/>
                    <input type="number" value={numCat} onChange={(e) => setNumCat(parseInt(e.target.value))}
                           placeholder="Número de Participantes"/>
                    <ButtonCancel type="button" onClick={seeNewCat}>Cancel</ButtonCancel>
                    <ButtonSave type="button" onClick={createNewCat}>Criar</ButtonSave>

                </div>

                <button onClick={seeNewCat} type="button" className={!showNewCat ? "" : "hidden"}>Criar Categorias
                </button>

                <label htmlFor="tipo">Tipo de Torneio :</label>
                    <select name="tipo" id="tipo" value={tipo} onChange={handleSaveOptionTypeCompetition}>
                        {TypeCompetitions.map((value, index)=>{
                            return<option value={index}>{value}</option>
                        })}
                    </select>

                <label htmlFor="descricao">Descrição:</label>
                <textarea id="descricao" cols={20} rows={10} value={descricao}
                          onChange={(e) => setDescricao(e.target.value)}/>
                <br/>
                <textarea hidden name="descricao" cols={20} rows={10} value={JSON.stringify(descricao)}/>

                <GroupButtonCancelSave/>
            </form>
        </ContainerPageCriarEvento>
    </>
}