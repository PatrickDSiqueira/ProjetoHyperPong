import CategoryType from "./categoryType";

export default interface EventType {
    id: string,
    nomeEvento: string,
    data: string,
    horario: string,
    descricao: string,
    status: string,
    categoriasObj: CategoryType[]
}