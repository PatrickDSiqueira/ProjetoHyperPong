import {useEffect, useState} from "react";
import {ParticipantType} from "../types/types";
import {database, onValue, ref} from "../FirebaseService";
import { useNavigate } from "react-router-dom";

export function useAllParticipants(setVisibleLoading: React.Dispatch<React.SetStateAction<boolean>>, idEvent: string | undefined, idCategory: string | undefined, controlador ?:any) {
    const [participants, setParticipants] = useState<ParticipantType[]>([]);

    const navigate = useNavigate()

    useEffect(() => {
            setVisibleLoading(true)

            const allParticipants: ParticipantType[] = [];
            const participantsRef = ref(database, `events/${idEvent}/categories/${idCategory}/participants`);

            onValue(participantsRef, (snapshot) => {
                
                if (snapshot.exists()) {
                    snapshot.forEach((elem) => {
                        allParticipants.push(elem.val())
                    });
                    setParticipants(allParticipants);
                    setVisibleLoading(false);
                }else{
                    setVisibleLoading(false)
                    navigate('/notfound')
                }
            });
        },
        [setVisibleLoading, controlador]);
    return participants;
}