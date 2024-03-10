import React, {useContext, useEffect, useState} from "react";
import {Outlet, Navigate} from "react-router-dom";
import {AuthContext} from "./AuthContext";
import {routes} from "../routes/Routes";

export const ProtectedAdminRoute = () => {

    const user = useContext(AuthContext);
    const [contextLoaded, setContextLoaded] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {

        setCount(count + 1);

        if (user) {

            setContextLoaded(true);

        } else if (count > 0) {

            setContextLoaded(true);
        }

    }, [user]);

    if (!contextLoaded) {

        return <>loading</>;
    }


    return user ? user.isAdmin()
            ? <Outlet/>
            : <Navigate to={routes.auth.not_allowed}/>
        : <Navigate to={routes.auth.login}/>
};