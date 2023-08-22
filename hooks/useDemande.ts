import { DemandeContext } from '@/contexts/demandesContext'
import { useContext } from "react";

export const useDemande = () => {
    const context = useContext(DemandeContext)

    if(!context) {
        throw Error('use the Context Provider inside the App')
    }

    return context
}