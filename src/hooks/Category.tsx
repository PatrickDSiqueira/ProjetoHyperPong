import {useEffect, useState} from "react";
import {child, database, get, ref} from "../FirebaseService";
import {useNavigate} from "react-router-dom";
import {loadingStart, loadingStop} from "../App";

export function GetCategoryName(idEvent: string | undefined, idCategory: string | undefined) {

    loadingStart();

    const [nameCategory, setNameCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
            get(child(ref(database), `events/${idEvent}/categories/${idCategory}/name`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        setNameCategory(snapshot.val());
                    } else {
                        navigate('/notfound');
                    }
                })
        },[]);
    loadingStop();
    return nameCategory;
}