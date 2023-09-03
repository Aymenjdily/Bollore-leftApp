import { NextRequest } from "next/server"
import { connectToDB } from "@/utils/connecttodb"
import User from "@/models/user"
import bcryptjs from 'bcryptjs'

export const DELETE = async (req: NextRequest, {params}: any) => {
    try{
        await connectToDB()

        await User.findByIdAndRemove(params.id)

        return new Response("User Deleted successfully", {status:200})
    }
    catch(error){
        return new Response('Failed to Delete The User', {status:500})
    }
}

export const PATCH = async (req: NextRequest, {params}:any) => {
    const {fullName, email, password, role, department} = await req.json()

    try{
        await connectToDB()

        const existUser = await User.findById(params.id)

        if(!existUser){
            return new Response("User not found", { status:404 })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        existUser.fullName = fullName
        existUser.email = email
        existUser.password = hashedPassword
        existUser.role = role
        existUser.department = department

        await existUser.save()

        return new Response(JSON.stringify(existUser), {status:200})
    }
    catch(error){
        return new Response('Failed to Update The User', {status:500})
    }
}

export const GET = async (req: NextRequest, { params }: any) => {
    try{
        await connectToDB()

        const user = await User.findById(params.id)

        if(!User){
            return new Response("User not found", { status:404 })
        }

        return new Response(JSON.stringify(user), {status:200})
    }
    catch(error){
        return new Response('Failed to fetch User', {status:500})
    }
}