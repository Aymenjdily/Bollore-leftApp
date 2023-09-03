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

export const PATCH = async (req: NextRequest, {params}:any) => {
    const { state, validator } = await req.json()

    try{
        await connectToDB()

        const existDemande = await Demande.findById(params.id)

        if(!existDemande){
            return new Response("Demande not found", { status:404 })
        }

        existDemande.state = state
        existDemande.validator = validator

        await existDemande.save()

        return new Response(JSON.stringify(existDemande), {status:200})
    }
    catch(error){
        return new Response('Failed to Update The Demande', {status:500})
    }
}

export const DELETE = async (req: NextRequest, {params}: any) => {
    try{
        await connectToDB()

        await Demande.findByIdAndRemove(params.id)

        return new Response("Demande Deleted successfully", {status:200})
    }
    catch(error){
        return new Response('Failed to Delete The Demande', {status:500})
    }
}