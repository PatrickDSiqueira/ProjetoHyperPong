import {useEffect, useState} from "react";
import {EventType} from "../types/types";
import {database, ref, get, child} from "../FirebaseService";
import { useNavigate } from "react-router-dom";

export function useOneEvent(setVisibleLoading: React.Dispatch<React.SetStateAction<boolean>>, idEvent: string | undefined) {
    const [event, setEvent] = useState<EventType>();

    const navigate = useNavigate();

    useEffect(() => {

        get(child(ref(database), `events/${idEvent}`))
            .then((snapshot) => {

                if (snapshot.exists()) {
                    setEvent(snapshot.val())
                }else{
                    setVisibleLoading(false)
                    navigate('/notfound')
                }

                setVisibleLoading(false)
            })
    },
    []);
    return event;
}