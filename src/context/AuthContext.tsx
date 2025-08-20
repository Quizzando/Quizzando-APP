import { createContext, useState} from "react";
import type { Auth } from "@/model/types";


type AuthProviderState = {
    user: Auth['user'],
    token: Auth['token'],
    register: () => Promise<void>
    login: () => Promise<void>
    logout: () => void
}


export const AuthContext = createContext<AuthProviderState | undefined>(undefined);


export const AuthProvider = ({children}: React.PropsWithChildren) => {
    const [user, setUser] = useState<Auth['user']>(null);
    const [token, setToken] = useState<Auth['token']>(null);

    const register = async () => {
    };

    const login = async () => {};

    const logout = () => {
        console.log('deslogando....');
        setUser(null);
        setToken(null);
    };



    return <AuthContext.Provider value={{user, token, register, login, logout}}>
        {children}
    </AuthContext.Provider>
}