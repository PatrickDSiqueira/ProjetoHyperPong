import {useEffect, useState} from "react";
import {EventType} from "../types/types";
import {database, onValue, ref} from "../FirebaseService";

export function useAllEvents(setVisibleLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    const [eventsList, setEventsList] = useState<EventType[]>([]);

    useEffect(() => {
            async function fecthData() {
                const allEventsRef = ref(database, "events/");

                const allEvents: EventType[] = [];

                await onValue(allEventsRef, (snapshot) => {
                    snapshot.forEach((elem) => {
                        allEvents.push(elem.val())
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
                    setVisibleLoading(false)
                });

            }
            fecthData()
        },
        []);
    return eventsList;
}