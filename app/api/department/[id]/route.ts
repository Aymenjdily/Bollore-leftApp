import { connectToDB } from "@/utils/connecttodb";
import Department from "@/models/department";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
    try{
        await connectToDB()

        const department = await Department.findById(params.id)

        if(!department){
            return new Response("Department not found", { status:404 })
        }

        return new Response(JSON.stringify(department), {status:200})
    }
    catch(error){
        return new Response('Failed to fetch Department', {status:500})
    }
}

export const PATCH = async (req: NextRequest, {params}:any) => {
    const { title, company } = await req.json()

    try{
        await connectToDB()

        const existDepartment = await Department.findById(params.id)

        if(!existDepartment){
            return new Response("Department not found", { status:404 })
        }

        existDepartment.title = title
        existDepartment.company = company

        await existDepartment.save()

        return new Response(JSON.stringify(existDepartment), {status:200})
    }
    catch(error){
        return new Response('Failed to Update The Department', {status:500})
    }
}

export const DELETE = async (req: NextRequest, {params}: any) => {
    try{
        await connectToDB()

        await Department.findByIdAndRemove(params.id)

        return new Response("Department Deleted successfully", {status:200})
    }
    catch(error){
        return new Response('Failed to Delete The Department', {status:500})
    }
}