import {useEffect, useState} from "react";
import {child, database, get, ref} from "../FirebaseService";
import { useNavigate } from "react-router-dom";

export function useNameCategory(setVisibleLoading: React.Dispatch<React.SetStateAction<boolean>>, idEvent: string | undefined, idCategory: string | undefined) {
    const [nameCategory, setNameCategory] = useState();

    const navigate = useNavigate();

    useEffect(() => {

            setVisibleLoading(true)


            get(child(ref(database), `events/${idEvent}/categories/${idCategory}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const name = snapshot.val().nome
                    setNameCategory(name)
                    }else {
                        setVisibleLoading(false)
                        navigate('/notfound')
                    }
                    setVisibleLoading(false);
                })
        },
        []);
    return nameCategory;
}
