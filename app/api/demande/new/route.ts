import Demande from "@/models/demande";
import { connectToDB } from "@/utils/connecttodb";
import { NextRequest } from "next/server";

export const POST = async (request:NextRequest) => {
    const { userId, title, reason, type, dateDepart, dateRetour, department, state } = await request.json();

    try {
        await connectToDB();
        const newDemande = new Demande({ creator: userId, title, reason, type, dateDepart, dateRetour, state, department });

        await newDemande.save();
        return new Response(JSON.stringify(newDemande), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Demande", { status: 500 });
    }
}