import { db } from "../../../lib/db";
import { getUserDataFromToken } from "../../../../helpers/getUserData";
import {NextResponse} from "next/server";

export async function GET(request){
    try {
        const userId = await getUserDataFromToken(request);
        const user = await db.user.findUnique({ where : {id : userId}})
        return NextResponse.json({
            message : "user found",
            status : 200,
            userId : user?.id,
            user
        })
        
    } catch (error) {
        return NextResponse.json({
            error : error.message,
            status : 400
        })
    }
}