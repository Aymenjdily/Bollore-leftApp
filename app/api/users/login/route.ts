import { connectToDB } from "@/utils/connecttodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connectToDB()

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { email, password } = body

        // check if user Exists

        const userExists = await User.findOne({email}).select("+password")

        if(!userExists){
            return NextResponse.json({error : "User does not exist"}, {status:400})
        }

        // check password
        if(!password) return NextResponse.json({error : "Password not exist"}, {status:400})

        const validPassword = await bcryptjs.compare(password, userExists.password)

        // if(userExists.email === email && userExists.password !== validPassword) {
        //     return NextResponse.json({error: "Your password is Incorrect"}, {status:4000})
        // }

        if(!validPassword){
            return NextResponse.json({error : "Invalid password"}, {status:400})
        }

        // create token data

        const tokenData = {
            id: userExists._id,
            fullName: userExists.fullName,
            role: userExists.role,
            department: userExists.department,
            email: userExists.email
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message:"Login Successful",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly:true
        })

        return response

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {
            status:500
        })
    }
}