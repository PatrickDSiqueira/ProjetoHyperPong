import {useEffect, useState} from "react";
import {child, database, get, ref} from "../FirebaseService";
import {useNavigate} from "react-router-dom";
import {loadingStart, loadingStop} from "../App";

export function useNameCategory(idEvent: string | undefined, idCategory: string | undefined) {

    loadingStart();

    const [nameCategory, setNameCategory] = useState();

    const navigate = useNavigate();

    useEffect(() => {

            get(child(ref(database), `events/${idEvent}/categories/${idCategory}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const name = snapshot.val().nome
                        setNameCategory(name)
                    } else {
                        loadingStop();
                        navigate('/notfound')
                        return;
                    }
                })

        },[ idCategory, idEvent, navigate ]);

    loadingStop();
    return nameCategory;
}
