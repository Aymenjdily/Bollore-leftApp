import { connectToDB } from "@/utils/connecttodb";

import Department from "@/models/department";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    try{
        await connectToDB()
        // .populate('creator')
        const departments = await Department.find({})

        return new Response(JSON.stringify(departments), {status:200})
    }
    catch(error){
        return new Response('Failed to fetch all Departments', {status:500})
    }
}