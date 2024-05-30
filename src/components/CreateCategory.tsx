import React, {useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {InputNumber} from 'primereact/inputnumber';
import {Texts} from "../trans/texts";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Category} from "../types/Category";

interface CreateCategoryProps {
    categories: Category[],
    setCategories: (categoriesList: Category[]) => void
}


export default function CreateCategory({categories, setCategories}: CreateCategoryProps) {

    const [showCategories, setShowCategories] = useState(false);

    const [showNewCategory, setShowNewCategory] = useState(false);

    const [nameNewCategory, setNameNewCategory] = useState('');

    const [newCatQtdParticipant, setNewCatQtdParticipant] = useState(0);

    const createNewCat = (category: Category) => {

        setCategories([...categories, category]);

        closeNewCategoryModal();
    };

    const deleteCategory = (i: number) => setCategories(categories.filter((_, index) => index !== i));

    const hasCategory = () => categories.length !== 0;

    const closeNewCategoryModal = () => {

        setShowNewCategory(false);
        setShowCategories(true);
    }

    const openNewCategoryModal = () => {

        setNameNewCategory('');
        setNewCatQtdParticipant(0);
        setShowCategories(false);
        setShowNewCategory(true);
    }

    return <>
        <Button type="button" size="small" label="Categorias" icon="pi pi-external-link"
                onClick={() => setShowCategories(true)}
                outlined={!hasCategory()}/>

        <Dialog visible={showCategories} header={Texts.categories} className="custom-responsive-width-modal"
                onHide={() => setShowCategories(false)} resizable
                footer={<Button icon="pi pi-plus" severity="success" label="Nova"
                                onClick={openNewCategoryModal}
                />}
        >
            {hasCategory() && <DataTable value={categories} showGridlines size="small">
                <Column field="name" header="Name"></Column>
                <Column field="maxParticipant" header={Texts.max_participants}></Column>
                <Column body={(_, {rowIndex}) => <i onClick={() => deleteCategory(rowIndex)} className="pi pi-trash"></i>}></Column>
            </DataTable>}
        </Dialog>

        <Dialog visible={showNewCategory} header={Texts.new_category} className="custom-responsive-width-modal"
                onHide={closeNewCategoryModal}
                footer={<span className="flex justify-content-around">
                    <Button severity="danger" label={Texts.cancel}
                            onClick={closeNewCategoryModal}/>
                    <Button severity="success" label={Texts.create}
                            onClick={() => createNewCat(new Category(nameNewCategory, [], Number(newCatQtdParticipant)))}/>
                </span>}
        >
            <div className="flex flex-column gap-2" style={{marginTop: 10}}>
                <label className="form-label" htmlFor="category-name">{Texts.name} :</label>
                <InputText id="category-name" required placeholder="Nome do Evento" name="name"
                           value={nameNewCategory}
                           onChange={({target}) => setNameNewCategory(target.value)}/>
            </div>
            <div className="flex flex-column gap-2" style={{marginTop: 10}}>
                <label className="form-label" htmlFor="category-qtd-participant">{Texts.qtd_participants} :</label>
                <InputNumber id="category-qtd-participant" required placeholder={Texts.qtd_participants}
                             value={newCatQtdParticipant} onChange={({value}) => setNewCatQtdParticipant(value || 0)}
                             name="qtd-participants"/>
            </div>

        </Dialog>
    </>
}
        