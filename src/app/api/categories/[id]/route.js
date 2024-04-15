import {NextResponse} from "next/server"
import { db } from "../../../lib/db";
import jwt from "jsonwebtoken"


export async function PUT (request , {params}) {
    const {id} = params;
    try {
        const category = await db.category.findUnique({where : {id : parseInt(id)}})
        const encodedToken = request.cookies.get('token')?.value || '';
        const user = jwt.verify(encodedToken , process.env.SECRET_KEY);
        let updatedUser;
        if(category.userId.includes(user.id)){
            updatedUser = await db.category.update({
                where: {
                  id : parseInt(id),
                },
                data : {
                    userId : {
                        set : category.userId.filter((id) => id !== user.id )
                    }
                },
              })
        }else{
            updatedUser = await db.category.update({
                where: {
                  id : parseInt(id),
                },
                data : {
                    userId : {
                        push : parseInt(user.id)
                    }
                },
              })
        }


        return NextResponse.json({
            updatedUser,
            message : "Category added successfully",
        },{status : 200})

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            message : "could'nt add category",
            error : error.message
        },{status : 500})
    }
}