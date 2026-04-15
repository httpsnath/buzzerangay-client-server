import { Redirect, useRouter } from "expo-router";
import { createContext, useContext, useState } from "react";

type EngineContextType = {
    authenticated: string | null;
    phone_number: string | null
    name: string | null
    role: string | null

    login: (userData: any) => void;
    logout: () => void;

    applyPhone: (phone: any) => void
    applyName: (name: string) => void
    applyRole: (role: string) => void

}

const EngineContext = createContext<EngineContextType | null>(null);

export default function EngineProvider({children}: any) {
    const router = useRouter()


    const [authenticated, setAuthenticated] = useState<string | null>(null)
    const [phone_number, setPhone_number] = useState<string | null>(null)
    const [name, setName] = useState<string | null>(null)
    const [role, setRole] = useState<string | null>(null)

    const login = (userData: any) => {
        setAuthenticated(userData)
    }

    const logout = () => {

        setAuthenticated(null)
        router.replace("/(auth)/login")

        
    }

    const applyPhone = (phone: any) => {
        setPhone_number(phone)
    }


    const applyName = (name: any) => {
        setName(name)
    }

    const applyRole = (role: any) => {
        setRole(role)
    }




    return (
        <EngineContext.Provider value={{authenticated, name, role, phone_number, login, logout, applyName, applyPhone, applyRole}}>
            {children}
        </EngineContext.Provider>
    )
}

export const useEngine = () => {
    const ctx = useContext(EngineContext);
    if (!ctx) throw new Error("EngineContext not found");
    return ctx;
};