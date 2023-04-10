import React, {createContext, ReactNode, useState} from "react";


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
    return <AuthContext.Provider value={{userLogin, setUser}}>{props.children}</AuthContext.Provider>
}