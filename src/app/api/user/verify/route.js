import { db } from "../../../lib/db";
import {NextResponse} from "next/server"
import bcrypt from "bcrypt"


export async function POST (request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");
        const otp = await request.json();
        const isUserVerified = await bcrypt.compare(otp.toString(),token)

        if(!token) {
            throw Error("token is required")
        }
        const user = await db.user.findFirst({
            where : {verifyToken : token , verifyTokenExpiry : {gte : new Date()}}
        })

        if(!isUserVerified) {
            throw Error ("Invalid otp")
        }

        if(isUserVerified) {
            await db.user.update({
                where: {
                  id : user.id,
                },
                data : {
                    isVerified : {
                        set : true
                    }
                },
              })
        }

        return NextResponse.json({
            message : "user verified successfully",
            isUserVerified,
        },{status : 200})

    } catch (error) {
        return NextResponse.json({
            message : "user verification failed",
            error : error.message
        },{status : 500})
    }
}