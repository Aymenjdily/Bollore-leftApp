import { connectToDB } from "@/utils/connecttodb";
import Demande from "@/models/demande";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
    try{
        await connectToDB()

        const demande = await Demande.findById(params.id).populate('creator')

        if(!demande){
            return new Response("Demande not found", { status:404 })
        }

        return new Response(JSON.stringify(demande), {status:200})
    }
    catch(error){
        return new Response('Failed to fetch Demande', {status:500})
    }
}
