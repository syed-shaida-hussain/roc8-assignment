import {NextResponse} from "next/server"
import { hash } from "bcrypt"
import { db } from "../../../lib/db";

export async function POST (request) {
    try {
        const body = await request.json();
        const {name, email, password} = body;
        const existingUser = await db.user.findUnique({
            where : {email}
        })

        if(existingUser){
            return NextResponse.json({
                message : "User with this email already exists",
                user : null
            } , {status : 409})
        }
        const hashedPassword = await hash(password, 10)
        const newUser = await db.user.create({
            data : {
                name,
                email,
                password : hashedPassword
            }
        })

        const { password : newPassword , ...rest} = newUser
        NextResponse.json({
            message : "user created successfully",
            user : rest
        },{status : 201})
    } catch (error) {
        NextResponse.json({
            message : "signup failed",
            error : error.message
        },{status : 500})
    }
}