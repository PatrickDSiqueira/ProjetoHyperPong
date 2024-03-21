import {useEffect, useState} from "react";
import {EventType} from "../types/types";
import {child, database, get, onValue, ref} from "../FirebaseService";
import {useNavigate} from "react-router-dom";
import {loadingStart, loadingStop} from "../App";
import moment from "moment";


export function GetAll(listening = 0) {

    const [eventsList, setEventsList] = useState<EventType[]>([]);

    useEffect(() => {

        loadingStart();

        async function fetchData() {

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

        fetchData();
    }, [listening]);
    loadingStop();
    return eventsList;
}

export function GetOnlyAttributes(attributes: string[], surchYear: 'all' | number = 'all') {

    const [eventsList, setEventsList] = useState<any[]>([]); // Definindo o tipo para any[]

    useEffect(() => {
        const fetchData = async () => {
            loadingStart();
            try {

                const allEventsRef = ref(database, "events/");
                const allEvents: any[] = [];

                await onValue(allEventsRef, (snapshot) => {

                    snapshot.forEach((elem) => {

                        if (surchYear === "all" || moment(elem.val()['end_date']).year() === surchYear) {
                            const values: any = [];

                            if (attributes) {
                                attributes.forEach((attr) => {


                                    values[attr] = elem.val()[attr];
                                });
                            }
                            allEvents.push(values);
                        }
                    });
                    setEventsList(allEvents);
                });
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                loadingStop();
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    return eventsList;
}

export function GetOne(idEvent: string | undefined, listening: number = 0) {

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
    }, [idEvent, navigate, listening]);
    loadingStop();
    return event;
}

export function GetNameEvent(idEvent: string | undefined) {

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
    }, [idEvent, navigate]);
    loadingStop();
    return eventName;
}