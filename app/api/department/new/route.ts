import Department from "@/models/department";
import { connectToDB } from "@/utils/connecttodb";
import { NextRequest } from "next/server";

export const POST = async (request:NextRequest) => {
    const { title } = await request.json();

    try {
        await connectToDB();
        const newDepartment = new Department({ title });

        await newDepartment.save();
        return new Response(JSON.stringify(newDepartment), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Department", { status: 500 });
    }
}