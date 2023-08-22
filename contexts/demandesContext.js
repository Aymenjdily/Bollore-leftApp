"use client"

import { createContext, useReducer, useEffect } from "react";

export const DemandeContext = createContext()

export const DemandeReducer = (state, action) => {
    switch(action.type){
        case 'SET_DEMANDE':
            return {
                demandes: action.payload
            }
        case 'CREATE_DEMANDE':
            return{
                demandes: [action.payload, ...state.demandes]
            }
        case 'DELETE_DEMANDE':
            return {
                demandes: state.demandes.filter((d) => d._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const DemandeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DemandeReducer, {
        demandes: null
    })

    useEffect(() => {
        const fetchDemandes = async () => {
          const res = await fetch('/api/demande')
          const data = await res.json()
    
          if(res.ok){
            dispatch({
                type:'SET_DEMANDE',
                payload:data
            })
          }
        }
    
        fetchDemandes()
    }, [])
    
    
    return(
        <DemandeContext.Provider value={{...state, dispatch}}>
            {children}
        </DemandeContext.Provider>
    )
}