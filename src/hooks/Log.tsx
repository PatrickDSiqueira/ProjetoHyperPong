import {useEffect, useState} from "react";
import {Log} from "../types/types";
import {child, database, onValue, push, ref, set} from "../FirebaseService";
import moment from "moment";

function GetAll() {

    const [logs, setLogs] = useState<Log[]>([]);

    useEffect(() => {
        async function fecthData() {

            const logsRef = ref(database, "logs/");

            const allLogs: Log[] = [];

            await onValue(logsRef, (snapshot) => {

                snapshot.forEach((elem) => {

                    let log = new Log(moment(elem.val().date), elem.val().type, elem.val().text)
                    allLogs.push(log)
                });

                allLogs.sort((a: Log, b: Log) => {

                    if (a.getDate() < b.getDate()) {
                        return 1;
                    } else if (a.getDate() > b.getDate()) {
                        return -1;
                    } else {
                        return 0;
                    }
                });

                setLogs(allLogs);
            });

        }

        fecthData();

    }, []);

    return logs;
}

export async function CreateLog(type: 1 | 2 | 3, text: string) {

    const id = push(child(ref(database), 'logs')).key;

    await set(ref(database, "logs/" + id), {
        
        date: moment().toISOString(),
        type,
        text,
    });
}

export default {
    GetAll,
    CreateLog
}