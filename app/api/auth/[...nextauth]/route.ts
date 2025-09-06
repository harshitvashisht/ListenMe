import NextAuth from "next-auth"
import prisma from "@/app/lib/db";
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";
import { error } from "console";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

 const prismaClient = prisma()

const handler = NextAuth({
  providers : [
    CredentialsProvider({
    
        name: 'Credentials',


        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
              
              if(!credentials?.username || !credentials?.password){
                throw error ("All Fields Are Required")
              }

              const user = await prismaClient.user.findUnique({
                where :{username : credentials.username}
              })

              if(!user){
                throw error("No User Found")
              }
              const passwordmatch = await bcrypt.compare(credentials.password , user.password)

              if (!passwordmatch){
                return NextResponse.json({
                  message : "Incorrect Password"
                })
              }
             return user
        }
        
      }),

      Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      clientId: "",
      clientSecret: ""
    }),
  ],
   
   
    })

export { handler as GET, handler as POST }