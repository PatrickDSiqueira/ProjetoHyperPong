import React, {useContext, useEffect, useState} from "react";
import {Outlet, Navigate} from "react-router-dom";
import {AuthContext} from "./AuthContext";
import {routes} from "../routes/Routes";
import LoadingPage from "../views/LoadingPage";

export const ProtectedRoute = () => {

    const user = useContext(AuthContext);
    const [contextLoaded, setContextLoaded] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {

        setCount(count + 1);

        if (user) {

            setContextLoaded(true);

        }

        if (count > 0){

            setContextLoaded(true);
        }

    }, [user]);

    if (!contextLoaded) {

        return <>loading</>;
    }

    return user ? <Outlet /> : <Navigate to={routes.auth.login}/>
};