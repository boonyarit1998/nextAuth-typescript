import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';
import { NextRequest,NextResponse } from 'next/server';

export  async function POST(req : NextRequest ) {
    try{
        const {token,password} = await req.json();
        console.log(token);
        console.log("Server Time:", new Date());
        const user = await prisma.user.findFirst({
            where : {
                resetToken : token,
                resetTokenExpiry : {
                    not: null, // ตรวจสอบว่าไม่เป็น null
                    gt : new Date()
                }
            }

        });
        console.log(user);

        if(!user){
          return   NextResponse.json({message:"Invalid or expired token"},{status: 400});
        }else{
            const hashedPassword = await bcrypt.hash(password,10);  

            await prisma.user.update({
                where :{id : user.id},
                data : {password : hashedPassword,resetToken : null, resetTokenExpiry : null}
            })
    

        }

       
        return  NextResponse.json({message:"Password reset successfully"},{status: 200});
    }catch(error : any){
        return  NextResponse.json({ message: "Internal server error" },{status: 500});
    }
}