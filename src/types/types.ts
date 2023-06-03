export interface ParticipantType {
    idParticipants: string,
    nomeSobrenome: string,
    telefone: string,
    dtaNascimento: string,
    status: string
}

export interface EventType {
    id: string,
    name: string,
    date: string,
    time: string,
    end_date: string
    description: string,
    wallpaper: string,
    status: string,
    type: string,
    address: string,
    local: string,
    categories: CategoryType[]
}

export interface CategoryType {
    maxParticipants: number,
    name: string,
    participants: ParticipantType[]
}

export const StatusEvents = [
    "Disponível",
    "Encerrado",
    "Em Breve"
]

export const StatusPartipants = [
    "Aguardando",
    "Confirmado",
]

export const TypeCompetitions = [
    "Rachão",
    "Copa",
    "Outras"
];

export type routeParams = {
    idEvent: string,
    idCategory: string
}

export interface PropsComponetCategory {
    category: CategoryType,
    index: number,
    statusEvent : typeof StatusEvents[number]
}

export interface TypesMessages  {
    type : "success" | "error" | "Observation"
}

export type typeMessage = "success" | "error" | "Observation";