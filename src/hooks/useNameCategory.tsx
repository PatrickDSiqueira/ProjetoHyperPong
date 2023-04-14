import {useEffect, useState} from "react";
import {child, database, get, ref} from "../FirebaseService";

export function useNameCategory(setVisibleLoading: React.Dispatch<React.SetStateAction<boolean>>, idEvent: string | undefined, idCategory: string | undefined) {
    const [nameCategory, setNameCategory] = useState();

    useEffect(() => {

            setVisibleLoading(true)


            get(child(ref(database), `events/${idEvent}/categories/${idCategory}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const name = snapshot.val().nome
                    setNameCategory(name)
                    }
                    setVisibleLoading(false);
                })
        },
        []);
    return nameCategory;
}
