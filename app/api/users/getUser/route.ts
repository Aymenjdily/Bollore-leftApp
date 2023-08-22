import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDB } from "@/utils/connecttodb";

connectToDB()

export async function GET(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req)

        const user = await User.findOne({_id: userId}).select("-password")
        return NextResponse.json({
            message: "User Found",
            success: true,
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status:400
        })
    }
}