import {NextResponse} from "next/server"
import { db } from "../../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const handleErrors = (error) => {
    let errors = {email : '' , password : ''};

    if(error.message === "email is required") {
        errors.email = "email is required"
    }

    if(error.message === "Password is required") {
        errors.password = "Password is required"
    }

    if(error.message === "incorrect email") {
        errors.email = "email is not registered"
    }

    if(error.message === "incorrect password") {
        errors.password = "Incorrect Password"
    }
    return errors
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({id} , process.env.SECRET_KEY , {
        expiresIn : maxAge
    })
}

export async function POST (request) {
    const {email,password} = await request.json();
    try {
        if(!email) {
            throw Error("email is required")
        }
        if(!password) {
            throw Error("Password is required")
        }

        const user = await db.user.findUnique({where : {email}});
        if(!user){
            throw Error("incorrect email")
        }

        const isPasswordEqual = await bcrypt.compare(password,user.password);
        if(!isPasswordEqual){
            throw Error("incorrect password")
        }

        const token = createToken(user.id);
        
        const response = NextResponse.json({
            message : "Login Successfull",
            success : true,
            status : 200,
            user,
            token
        })
        response.cookies.set("token" , token)
        return response
        } catch (error) {
        const errors = handleErrors(error);
        return NextResponse.json({
                message: "Problem in logging in",
                errors,
                status : 500,
        },{status : 404})
    }
}