"use client"

import { createContext, useReducer, useEffect } from "react";

export const DepartmentContext = createContext()

export const DepartmentReducer = (state, action) => {
    switch(action.type){
        case 'SET_DEPARTMENT':
            return {
                departments: action.payload
            }
        case 'CREATE_DEPARTMENT':
            return{
                departments: [action.payload, ...state.departments]
            }
        case 'DELETE_DEPARTMENT':
            return {
                departments: state.departments.filter((d) => d._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const DepartmentContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DepartmentReducer, {
        departments: []
    })
    
    return(
        <DepartmentContext.Provider value={{...state, dispatch}}>
            {children}
        </DepartmentContext.Provider>
    )
}