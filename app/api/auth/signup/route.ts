import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { error } from "console";

const prismaClient =  prisma ()

export async function POST (req:NextRequest){
        try {
             const data = await req.json()
             console.log(data)
          
             const existinguser = await prismaClient.user.findUnique({
                where :{username : data.username}
            })
             if (existinguser){
                throw error("user already exists")
             }
             await prismaClient.user.create({
              data: {
             username : data.username,
             password : data.password,
              fullName : data.fullName
             }
        })
         return NextResponse.json({
         message: "User Created"
        })
        }
        catch (error) {
            return NextResponse.json({
                message : "Internal Server Error !"
            })
        }

    }
