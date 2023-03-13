import moment from "moment";

export enum Status {
    DISPONIVEL,
    ENCERRADO
}

const database = {
    'CardEvento' :{
        0 :{
            'bg' : '#000000',
            'titulo' : 'Rachão de Fevereiro',
            'status' : Status[0],
            'data' : moment().format("DD/MM/YYYY - HH:MM")
        },
        1 :{
            'bg' : '#000000',
            'titulo' : 'Rachão de Março',
            'status' : Status[1],
            'data' : moment().format("DD/MM/YYYY - HH:MM")
        },
        2 :{
            'bg' : '#000000',
            'titulo' : 'Copa Hyper Março',
            'status' : Status[0],
            'data' : new Date()
        },
        3 :{
            'bg' : '#000000',
            'titulo' : 'Rachão de Fevereiro',
            'status' : Status[1],
            'data' : new Date()
        }
    }
}


export default database;
