import { connectToDB } from "@/utils/connecttodb";

import User from "@/models/user";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    try{
        await connectToDB()
        // .populate('creator')
        const users = await User.find({})

        return new Response(JSON.stringify(users), {status:200})
    }
    catch(error){
        return new Response('Failed to fetch all Users', {status:500})
    }
}