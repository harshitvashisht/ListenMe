import SpotifyWebPlayer from "react-spotify-web-playback";

export default function Player ({accessToken  , trackuri }){

    if (!accessToken) return null
     return <div> 
           <SpotifyWebPlayer token={accessToken} uris={trackuri ? [trackuri] : []}/>
     </div>
}