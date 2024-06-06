import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {auth} from "../FirebaseService";

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<any | null>(null);

export const GetCurrentUser = () => {

    return useContext(AuthContext)
}
export default function AuthContextProvider({children}: AuthContextProviderProps) {

    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {

        auth.onAuthStateChanged((user) => setUser(user || false));

    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}