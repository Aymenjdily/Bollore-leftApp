"use client"

import { createContext, useReducer, useEffect } from "react";

export const UsersContext = createContext()

export const UsersReducer = (state, action) => {
    switch(action.type){
        case 'SET_USER':
            return {
                users: action.payload
            }
        case 'CREATE_USER':
            return{
                users: [action.payload, ...state.users]
            }
        case 'DELETE_USER':
            return {
                users: state.users.filter((u) => u._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const UsersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UsersReducer, {
        users: null
    })

    useEffect(() => {
        const fetchUsers = async () => {
          const res = await fetch('/api/users')
          const data = await res.json()
    
          if(res.ok){
            dispatch({
                type:'SET_USER',
                payload:data
            })
          }
        }
    
        fetchUsers()
    }, [])
    
    
    return(
        <UsersContext.Provider value={{...state, dispatch}}>
            {children}
        </UsersContext.Provider>
    )
}