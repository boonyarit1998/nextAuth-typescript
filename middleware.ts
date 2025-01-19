import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req:NextRequest){
    const secret = process.env.NEXTAUTH_SECRET;
    const user = await getToken({
        req : req ,
        secret : secret,
    })

    const {pathname } = req.nextUrl

    if (pathname.startsWith('/admin')&&(!user || user.role  !==  'ADMIN')){
       return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}