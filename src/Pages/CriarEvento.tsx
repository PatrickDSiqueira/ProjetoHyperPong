import {useState} from "react";
import GroupButtonCancelSave from "../components/GroupButtonCancelSave";
import Header from "../components/Header";
import {ButtonCancel, ButtonSave} from "../components/styles/GroupButtonCancelSave";
import {ContainerPageCriarEvento} from "./styles/CriarEvento";


export default function CriarEvento() {

    interface Categoria {
        nome: string,
        maxParticipante: number
    }

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [showNewCat, setShowNewCat] = useState<boolean>(false);
    const [nomeCat, setNomeCat] = useState<string>();
    const [numCat, setNumCat] = useState<number>();

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


    return <>
        <Header titulo="Criar Evento"/>


        <ContainerPageCriarEvento>

            <form action="http://localhost:4000/api/admin/events" method="post">
                <label htmlFor="nomeEvento">Nome:</label>
                <input type="text" placeholder="Nome do Evento" id="nomeEvento" name="nomeEvento"/>

                <label htmlFor="horario">Horário:</label>
                <input type="time" placeholder="Horário" id="horario" name="horario"/>

                <label htmlFor="data">Data:</label>
                <input type="date" placeholder="Data" id="data" name="data"/>

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

                <label htmlFor="descricao">Descrição:</label>
                <textarea name="descricao" id="descricao" cols={20} rows={10}></textarea>

                <GroupButtonCancelSave/>
            </form>
        </ContainerPageCriarEvento>
    </>
}