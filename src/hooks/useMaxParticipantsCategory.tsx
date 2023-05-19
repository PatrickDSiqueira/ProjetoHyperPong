import {useEffect, useState} from "react";
import {child, database, get, ref} from "../FirebaseService";
import {useNavigate} from "react-router-dom";
import {ParticipantType} from "../types/types";

export function useMaxParticipantsCategory(idEvent: string | undefined, idCategory: string | undefined) {
    const [maxParticipantsCategory, setMaxParticipantsCategory] = useState<number>();
    const [participantsConfirm, setParticipantsConfirm] = useState<number>(0)

    var counter = 0;

    const navigate = useNavigate();

    useEffect(() => {

            get(child(ref(database), `events/${idEvent}/categories/${idCategory}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        setMaxParticipantsCategory(parseInt(snapshot.val().maxParticipants));

                        for (const participant of Object.values(snapshot.val().participants) as ParticipantType[]) {
                            if (participant.status && parseInt(participant.status) === 1) { // Confirmados
                                counter++;
                            }
                        }
                        setParticipantsConfirm(counter)
                    } else {
                        navigate('/notfound')
                    }
                })
        },
        []);
    return {maxParticipantsCategory, participantsConfirm};
}