import {useEffect, useState} from "react";
import {EventType} from "../types/types";
import {database, onValue, ref, get, child} from "../FirebaseService";

export function useOneEvent(setVisibleLoading: React.Dispatch<React.SetStateAction<boolean>>, idEvent: string | undefined) {
    const [event, setEvent] = useState<EventType>();

    useEffect(() => {

                get(child(ref(database), `eventos/${idEvent}`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            setEvent(snapshot.val())
                        }
                    })



                // const allEventsRef = ref(database, "eventos/");
                //
                // const allEvents: EventType[] = [];
                //
                // await onValue(allEventsRef, (snapshot) => {
                //     snapshot.forEach((elem) => {
                //         allEvents.push(elem.val())
                //     });
                //     setEvent(allEvents);
                //     setVisibleLoading(false)
                // });

            // }

        },
        []);
    return event;
}