import { DepartmentContext } from "@/contexts/departmentContext";
import { useContext } from "react";

export const useDepartment = () => {
    const context = useContext(DepartmentContext)

    if(!context) {
        throw Error('use the Context Provider inside the App')
    }

    return context
}