import {NextResponse} from "next/server"
import { db } from "../../../lib/db";
import jwt from "jsonwebtoken"


export async function PUT (request , {params}) {
    const {id} = params;
    try {
        const category = await db.category.findUnique({where : {id : parseInt(id)}})
        const encodedToken = request.cookies.get('token')?.value || '';
        const user = jwt.verify(encodedToken , process.env.SECRET_KEY);
        let updatedCat;
        if(category.userId.includes(user.id)){
            updatedCat = await db.category.update({
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
            updatedCat = await db.category.update({
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
            updatedCat,
            message : "Category added successfully",
        },{status : 200})

    } catch (error) {
        return NextResponse.json({
            message : "could'nt add category",
            error : error.message
        },{status : 500})
    }
}