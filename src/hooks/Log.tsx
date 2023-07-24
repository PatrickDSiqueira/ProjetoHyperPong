import {useEffect, useState} from "react";
import {Log} from "../types/types";
import {child, database, onValue, push, query, ref, set, limitToLast} from "../FirebaseService";
import moment from "moment";
import {loadingStart, loadingStop} from "../App";

export function GetAll(filter: number) {

    const [logs, setLogs] = useState<Log[]>([]);

    useEffect(() => {
        async function fecthData() {

            loadingStart();

            const logsRef = ref(database, "logs/");

            const dbRef = query(logsRef, limitToLast(filter));

            const allLogs: Log[] = [];

            await onValue(dbRef, (snapshot) => {

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

    },[filter]);

    loadingStop();
    return logs;
}

export async function CreateLog(type: 1 | 2 | 3, text: string) {

    loadingStart();

    const id = push(child(ref(database), 'logs')).key;

    await set(ref(database, "logs/" + id), {

        date: moment().toISOString(),
        type,
        text,
    });

    loadingStop();
    return;
}