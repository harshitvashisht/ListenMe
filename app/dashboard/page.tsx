 "use client" ;


import Link from "next/link"
import SpotifySearch from "../components/tracksearch";

export default  function Dashboard (){


   
      return <div>Dashboard
         <SpotifySearch/> 
           <Link href={"http://localhost:3000/api/spotify/login"}>Login With Spotify</Link>
            
      </div>

}