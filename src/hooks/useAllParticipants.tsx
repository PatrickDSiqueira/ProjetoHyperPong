import {useEffect, useState} from "react";
import {ParticipantType} from "../types/types";
import {database, onValue, ref} from "../FirebaseService";

export function useAllParticipants(setVisibleLoading: React.Dispatch<React.SetStateAction<boolean>>, idEvent: string | undefined, idCategory: string | undefined, controlador ?:any) {
    const [participants, setParticipants] = useState<ParticipantType[]>([]);

    useEffect(() => {
            setVisibleLoading(true)

            const allParticipants: ParticipantType[] = [];
            const participantsRef = ref(database, `events/${idEvent}/categories/${idCategory}/participants`);

            onValue(participantsRef, (snapshot) => {
                snapshot.forEach((elem) => {
                    allParticipants.push(elem.val())
                });
                setParticipants(allParticipants);
                setVisibleLoading(false);
            });
        },
        [setVisibleLoading, controlador]);
    return participants;
}