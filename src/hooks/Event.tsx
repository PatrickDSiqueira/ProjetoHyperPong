import {useEffect, useState} from "react";
import {EventType} from "../types/types";
import {child, database, get, onValue, ref} from "../FirebaseService";
import {useNavigate} from "react-router-dom";


function GetAll(setVisibleLoading: React.Dispatch<React.SetStateAction<boolean>>) {

    const [eventsList, setEventsList] = useState<EventType[]>([]);

    useEffect(() => {
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
                    setVisibleLoading(false);
                });

            }

            fecthData();
        },
        []);
    return eventsList;
}

function GetOne(setVisibleLoading: React.Dispatch<React.SetStateAction<boolean>>, idEvent: string | undefined) {

    const [event, setEvent] = useState<EventType>();

    const navigate = useNavigate();

    useEffect(() => {

            get(child(ref(database), `events/${idEvent}`))
                .then((snapshot) => {

                    if (snapshot.exists()) {
                        setEvent(snapshot.val())
                    } else {
                        setVisibleLoading(false);
                        navigate('/notfound');
                    }

                    setVisibleLoading(false);
                })
        },
        []);
    return event;
}

function GetNameEvent(idEvent: string | undefined) {

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
    return eventName;

};
export default {
    GetAll,
    GetOne,
    GetNameEvent
}