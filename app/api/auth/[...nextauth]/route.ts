import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider  from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt" ;
import { JWT  } from "next-auth/jwt";
import { User,Session } from "next-auth";


const authOptions : AuthOptions = {
    adapter : PrismaAdapter(prisma),
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                email : {label : "Email",type :"text "},
                password : {label: "Password",type : "password"},
            },
            async  authorize(credentials) {
                if (!credentials?.email || !credentials?.password){
                    throw new Error ("invalid credentails");
                }

                const user = await prisma.user.findUnique({
                    where : {email :credentials.email},
                });

                if(!user|| !user.password ) {
                    throw new Error ("Invalid credentails")
                }

                const isVailPassword = await bcrypt.compare(
                    credentials.password,user.password
                );

                if (!isVailPassword){
                    throw new Error ("Invalid credentails")
                }

                return user     
            },
        })
    ],
    session : { strategy : "jwt"},
    callbacks: {
        async jwt({ token, user } : {token : JWT;user?: User ; }) {
         
          if (user) {
            token.id = user.id;
            token.role = user.role;
          }

          return token;
        },
        async session({ session , token }:{session : Session;token : JWT}) {
          
          if (token) {
            session.user = {
                ...session.user,
                id: token.id as string,
                role: token.role as string
            };
          }

          return session;
        },
          async redirect({ baseUrl }) {
            return `${baseUrl}`;
        },
      },
      secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };