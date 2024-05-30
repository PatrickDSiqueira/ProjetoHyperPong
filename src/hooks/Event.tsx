import {useEffect, useState} from "react";
import {EventType, ParticipantType} from "../types/types";
import {child, database, get, onValue, ref} from "../FirebaseService";
import {useNavigate} from "react-router-dom";
import {loadingStart, loadingStop} from "../App";
import moment from "moment";
import Event from "../Model/Event";
import {Category} from "../types/Category";

export function GetAll(listening = 0) {

    const [eventsList, setEventsList] = useState<Event[]>([]);

    useEffect(() => {

        loadingStart();

        async function fetchData() {

            const allEventsRef = ref(database, "events/");

            const allEvents: Event[] = [];

            await onValue(allEventsRef, (snapshot) => {
                snapshot.forEach((elem) => {

                    const {
                        name, address, date, time, description, wallpaper,
                        type, end_date, categories, id, status
                    } = elem.val();

                    const categoryList = categories.map(
                        ({
                             name, participants, maxParticipant
                         }: {
                            name: string,
                            participants: ParticipantType[],
                            maxParticipant: number
                        }) => new Category(name, participants ? participants : [], maxParticipant ? maxParticipant : 0)
                    );

                    allEvents.push(
                        new Event(name, address, new Date(date), new Date(time), description, wallpaper,
                            parseInt(type), end_date, categoryList, id, parseInt(status))
                    );
                });

                allEvents.sort((a: Event, b: Event) => {

                    if (a.getDate() < b.getDate()) {

                        return -1;

                    } else if (a.getDate() > b.getDate()) {

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

    const [event, setEvent] = useState<Event>();

    const navigate = useNavigate();

    useEffect(() => {

        get(child(ref(database), `events/${idEvent}`))
            .then((snapshot) => {

                if (snapshot.exists()) {

                    const {
                        name, address, date, time, description, wallpaper,
                        type, end_date, categories, id,status
                    } = snapshot.val();

                    const categoryList = categories.map(
                        ({
                             name, participants, maxParticipant
                         }: {
                            name: string,
                            participants: ParticipantType[],
                            maxParticipant: number
                        }) => new Category(name, participants ? participants : [], maxParticipant ? maxParticipant : 0)
                    );

                    setEvent(new Event(name, address, new Date(date), new Date(time), description, wallpaper,
                        parseInt(type), end_date, categoryList, id, parseInt(status)))

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