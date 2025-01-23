
import prisma from "@/lib/prisma";
import { sendResetEmail } from "@/lib/sendResetEmail";
import crypto from 'crypto';
import { NextRequest,NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function POST(req : NextRequest ) {
    try{
        const {email} = await req.json();
        const user = await prisma.user.findUnique({
            where : {email}
        });

        if(!user){
            return  NextResponse.json({message:"User not found"},{status: 400});
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = dayjs().tz("Asia/Bangkok").add(1, "hour").toDate();


        await prisma.user.update({
            where : {email},
            data : {
                resetToken, resetTokenExpiry : resetTokenExpiry
            }
        })

        const resetUrl = `http://localhost:3000/resetpassword?token=${resetToken}`;    
        await sendResetEmail({email,resetUrl});

       return NextResponse.json({message:"Check your email for a reset link"},{status: 200});


    }catch(error : any){

        return NextResponse.json({message:error.message},{status: 400});
    }

}