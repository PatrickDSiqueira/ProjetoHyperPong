import React, {useContext, useEffect, useState} from "react";
import {Outlet, Navigate} from "react-router-dom";
import {AuthContext} from "./AuthContext";
import {routes} from "../routes/Routes";
import LoadingPage from "../views/LoadingPage";

export const ProtectedRoute = () => {

    const user = useContext(AuthContext);

    const [contextLoaded, setContextLoaded] = useState(false);

    useEffect(() => {

        if (user !== null && user !== undefined) {
            setContextLoaded(true);
        }

    }, [user]);

    if (!contextLoaded) {

        return <LoadingPage/>;
    }

    return user ? <Outlet/> : <Navigate to={routes.auth.login}/>
};