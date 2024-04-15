import {NextResponse} from "next/server"
import { hash  } from "bcrypt"
import { db } from "../../../lib/db";
import nodemailer from "nodemailer"

const handleErrors = (error) => {
    let errors = {name : '' , password : '' , email : ''};

    if(error.message === "name is required") {
        errors.name = "name is required"
    }

    if(error.message === "email is required") {
        errors.email = "email is required"
    }

    if(error.message === "password is required") {
        errors.password = "Password is required"
    }

    if(error.message === "password should be greater than 8"){
        errors.password = "password should be greater than or equal to 8"
    }

    if(error.message.includes("email already registered")) {
        errors.email = "email already registered"
        return errors
    }
    return errors
}

const sendEmail = async (otp,email) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'syedshaida59991@gmail.com',
          pass: 'iydz fzor mkis nimu'
        }
      });

      const mailOptions = {
        from : "syedshaida59991@gmail.com",
        to : email,
        subject : "VERIFY YOUR EMAIL BY USING THE CODE BELOW",
        html : `<p>OTP for verifying your email is ${otp} </p>`
      }

    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse
}

export async function POST (request) {
    try {
        const body = await request.json();
        const {name, email, password} = body;
        if(!name) {
            throw Error("name is required")
        }
        if(!email) {
            throw Error("email is required")
        }
        if(!password) {
            throw Error("password is required")
        }
        if(password.length < 8) {
            throw Error("password should be greater than 8")
        }
        const existingUser = await db.user.findUnique({
            where : {email}
        })

        if(existingUser) {
            throw Error ("email already registered")
        }

        if(existingUser){
            return NextResponse.json({
                message : "User with this email already exists",
                user : null
            } , {status : 409})
        }
        const hashedPassword = await hash(password, 10);
        const otp = Math.floor(Math .random() * (99999999 - 10000000 + 1)) + 10000000
        const hashedOtp = await hash(otp.toString() , 10)
        const currentDate = new Date();
        var newDate = new Date(currentDate.getTime() + 3600000);
        const newUser = await db.user.create({
            data : {
                name,
                email,
                password : hashedPassword,
                verifyToken : hashedOtp,
                verifyTokenExpiry : newDate,
                catPreferences : []
            }
        })
          
        sendEmail(otp,email)
        const { password : newPassword , ...rest} = newUser
        return NextResponse.json({
            message : "user created successfully",
            user : rest,
        },{status : 201})


    } catch (error) {
        console.log(error.message)
        const errors = handleErrors(error)
        return NextResponse.json({
            message : "signup failed",
            errors,
            error : error.message
        },{status : 500})
    }
}