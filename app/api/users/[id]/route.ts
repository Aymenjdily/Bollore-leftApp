import { NextRequest } from "next/server"
import { connectToDB } from "@/utils/connecttodb"
import User from "@/models/user"

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