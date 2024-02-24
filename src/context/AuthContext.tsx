import React, {createContext, ReactNode, useContext, useState} from "react";
import {auth} from "../FirebaseService";
import {User} from "../Model/User";

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<any | null>(null);

export const GetCurrentUser = () => {

    return useContext(AuthContext)
}
export default function AuthContextProvider({children}: AuthContextProviderProps) {

    const [user, setUser] = useState<any | null>(null);

    auth.onAuthStateChanged((user) => {
        if (user) {

            setUser(user);

        } else {

            setUser(false)
        }
    });

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}