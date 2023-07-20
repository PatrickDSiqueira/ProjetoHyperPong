import {useEffect, useState} from "react";
import {ParticipantType} from "../types/types";
import {database, onValue, ref} from "../FirebaseService";
import {loadingStart, loadingStop} from "../App";

export function useAllParticipants(idEvent: string | undefined, idCategory: string | undefined) {
    loadingStart();
    const [participants, setParticipants] = useState<ParticipantType[]>([]);

    useEffect(() => {

            const allParticipants: ParticipantType[] = [];
            const participantsRef = ref(database, `events/${idEvent}/categories/${idCategory}/participants`);

            onValue(participantsRef, (snapshot) => {

                if (snapshot.exists()) {
                    snapshot.forEach((elem) => {
                        allParticipants.push(elem.val())
                    });
                    setParticipants(allParticipants);
                    loadingStop();
                }
            });
        });
    loadingStop();
    return participants;
}