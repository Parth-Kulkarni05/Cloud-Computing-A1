import React, {useState, createContext} from "react";

export type array_subscriptions = {
    year: string, 
    artist: string, 
    title: string,
    id: number
}

type sub_details = {
    ScannedCount: number, 
    Items: array_subscriptions[]
}


type User = {
    email: string,
    user_name: string, 
    subscriptions: sub_details

}


type UserContextType = {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>

}

type UserContextProviderProps = {
    children: React.ReactNode
}

export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({children}: UserContextProviderProps) =>{

    const [user,setUser] = useState<User | null>(null); // Null as the user is logged in but this value can change

    return (
        <UserContext.Provider value = {{user, setUser}}>
            {children}
        </UserContext.Provider>

    )


} 