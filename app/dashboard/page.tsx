 "use client"
import { useSession } from "next-auth/react"
import { NextResponse } from "next/server"
import { Key } from "react"

export default  function Dashboard (){
              
      const session = useSession()



      return <div>Dashboard
            {session.status === "authenticated" ? 
            "LogOut" : "Signin"}
      </div>

}