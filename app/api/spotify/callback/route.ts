import { NextResponse } from "next/server";
import querystring from "querystring";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const redirect_uri = "http://127.0.0.1:3000/api/spotify/callback";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) return NextResponse.json({ error: "No code" }, { status: 400 });

  const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const body = querystring.stringify({
    grant_type: "authorization_code",
    code,
    redirect_uri,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  

  
  const data = await res.json();
 
  

  return NextResponse.redirect(
    `http://127.0.0.1:3000/dashboard?access_token=${data.access_token}&refresh_token=${data.refresh_token}`
  );
  
}
