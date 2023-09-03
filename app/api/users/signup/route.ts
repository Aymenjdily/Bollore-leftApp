import { connectToDB } from "@/utils/connecttodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connectToDB()

export async function POST(req: NextRequest){
    try {
        const body = await req.json()
        const {fullName, email, password, role, department} = body

        const userExists = await User.findOne({email})

        if(userExists) {
            return NextResponse.json({
                error: "User already exists"
            }, {
                status: 400
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            role,
            department,
        })

        const savedUser = await newUser.save()

        return NextResponse.json({message: "User Created Successfully", success: true, savedUser })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }
}