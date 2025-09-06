 "use client"
import { useSession } from "next-auth/react"
import { NextResponse } from "next/server"
import { Key } from "react"
import dotenv from 'dotenv'
dotenv.config

export default  function Dashboard (){
              
      const session = useSession()
      
    const clientid = process.env.CLIENT_ID;
    console.log(clientid)


      return <div>Dashboard

            {session.status === "authenticated" ? 
            "LogOut" : "Signin"}
      </div>

}