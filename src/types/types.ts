import moment, {Moment} from "moment";

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
    "Espera",
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

export interface LogType {
    /*
    1 - confirmation (v) (De criaçao de evento, Inscrição, atualização de evento,
        atualização de status de participante)
    2 - update (!) (Erro de inscrições criação de evento e de sistema)
    3 - error (x).
 */

    date: Date,
    type: 1 | 2 | 3, // Error, notification, inscribe,
    text: string
}


export class Log {
    private date: Moment; // moment that create log
    private type: 1 | 2 | 3;
    private text: string;

    constructor(date: Moment, type: 1 | 2 | 3, text: string) {

        this.date = date;
        this.type = type;
        this.text = text;
    }

    getDate() {
        return this.date;
    }

    getText() {
        return this.text;
    }

    getType() {
        return this.type;
    }

    getDiffTime() {

        const diffMinutes = moment().diff(moment(this.getDate()), "minutes");

        if (diffMinutes === 0) {
            return "Agora";
        }

        const diffHours = moment().diff(moment(this.getDate()), "hours");

        if (diffHours === 0) {
            return "Há " + diffMinutes + (diffMinutes === 1 ? " Min" : " Mins");
        }

        const diffDays = moment().diff(moment(this.getDate()), "days");

        if (diffDays === 0) {
            return "Há " + diffHours + (diffHours === 1 ? " Hr" : " Hrs");
        }

        return "Há " + diffDays + (diffDays ? " Dia" : " Dias");

    }
}