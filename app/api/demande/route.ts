import { connectToDB } from "@/utils/connecttodb";

import Demande from "@/models/demande";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    try{
        await connectToDB()
        // 
        const demandes = await Demande.find({}).populate('creator')

        return new Response(JSON.stringify(demandes), {status:200})
    }
    catch(error){
        return new Response('Failed to fetch all Demandes', {status:500})
    }
}