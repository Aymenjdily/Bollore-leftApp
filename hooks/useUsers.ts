import { useContext } from "react";
import { UsersContext } from "@/contexts/usersContext"

export const useUsers = () => {
    const context = useContext(UsersContext)

    if(!context) {
        throw Error('use the Context Provider inside the App')
    }

    return context
}