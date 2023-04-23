import React, {createContext, ReactNode, useEffect, useState} from "react";


export interface UserLogin {
    uid: string
    email: string
}

interface AuthContextProps {
    userLogin?: UserLogin,
    setUser?: React.Dispatch<React.SetStateAction<UserLogin | undefined>>;
}

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({});
export default function AuthContextProvider(props: AuthContextProviderProps) {
    const [userLogin, setUser] = useState<UserLogin>();

    useEffect(() => {
        const userFromLocalStorage = JSON.parse(localStorage.getItem('user') || '{}');
    
        if (userFromLocalStorage.uid && userFromLocalStorage.email && setUser) {
            setUser(userFromLocalStorage);
        }
      }, []);

    return <AuthContext.Provider value={{userLogin, setUser}}>{props.children}</AuthContext.Provider>
}