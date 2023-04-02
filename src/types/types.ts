 export interface ParticipantType {
    idParticipants : string,
    nomeSobrenome : string,
    telefone :string,
    dtaNascimento : string,
    status : string
}

 export interface EventType {
    id: string,
    nomeEvento: string,
    data: string,
    horario: string,
    descricao: string,
    status: string,
    categoriasObj: CategoryType[]
}
 export interface CategoryType {
    maxParticipante: number,
    nome: string,
    participantes : ParticipantType[]
}

export const StatusEvents = [
    "Disponível",
    "Espera",
    "Encerrado"
]

 export const StatusPartipante = [
    "Aguardando",
     "Confirmado"
 ]
