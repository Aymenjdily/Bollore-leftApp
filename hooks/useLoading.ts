import { LoadingContext } from '@/contexts/loadingContext'
import { useContext } from "react";

export const useLoading = () => {
    const context = useContext(LoadingContext)

    if(!context) {
        throw Error('use the Context Provider inside the App')
    }

    return context
}