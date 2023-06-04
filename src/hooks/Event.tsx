import {useEffect, useState} from "react";
import {EventType} from "../types/types";
import {child, database, get, onValue, ref} from "../FirebaseService";
import {useNavigate} from "react-router-dom";
import {loadingStart, loadingStop} from "../App";


function GetAll() {

    const [eventsList, setEventsList] = useState<EventType[]>([]);

    useEffect(() => {

            loadingStart();

            async function fecthData() {

                const allEventsRef = ref(database, "events/");

                const allEvents: EventType[] = [];

                await onValue(allEventsRef, (snapshot) => {
                    snapshot.forEach((elem) => {
                        allEvents.push(elem.val());
                    });

                    allEvents.sort((a: EventType, b: EventType) => {
                        if (a.date < b.date) {
                            return -1;
                        } else if (a.date > b.date) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    setEventsList(allEvents);
                });
            }
            fecthData();
        },
        []);
    loadingStop();
    return eventsList;
}

function GetOne(idEvent: string | undefined) {

    loadingStart();

    const [event, setEvent] = useState<EventType>();

    const navigate = useNavigate();

    useEffect(() => {

            get(child(ref(database), `events/${idEvent}`))
                .then((snapshot) => {

                    if (snapshot.exists()) {
                        setEvent(snapshot.val())
                    } else {
                        loadingStop();
                        navigate('/notfound');
                    }

                })
        },
        []);
    loadingStop();
    return event;
}

function GetNameEvent(idEvent: string | undefined) {

    loadingStart();

    const navigate = useNavigate();

    const [eventName, setEventName] = useState("");

    useEffect(() => {

            get(child(ref(database), `events/${idEvent}/name`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        setEventName(snapshot.val());
                    } else {
                        navigate('/notfound');
                    }
                })
        },
        []);
    loadingStop();
    return eventName;
}

export default {
    GetAll,
    GetOne,
    GetNameEvent
}