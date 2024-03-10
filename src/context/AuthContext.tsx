import React, {createContext, ReactNode, useContext, useState} from "react";
import {auth} from "../FirebaseService";
import {User} from "../Model/User";
import {useNavigate} from "react-router-dom";
import {routes} from "../routes/Routes";
import {now} from "moment";

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<User | false>(false);

export const GetCurrentUser = () => {

    const navigate = useNavigate();

    const user = useContext(AuthContext);

    if (user){

        return user;
    }
}
export default function AuthContextProvider({children}: AuthContextProviderProps) {

    const [user, setUser] = useState<User | false>(false);

    auth.onAuthStateChanged(async (user) => {

        if (user) {

            setUser(await User.findOne(user.uid));
        }

    });

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}