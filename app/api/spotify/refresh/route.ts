import { NextResponse } from "next/server";
import querystring from "querystring";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const refresh_token = url.searchParams.get("refresh_token");

  if (!refresh_token) {
    return NextResponse.json({ error: "No refresh token provided" }, { status: 400 });
  }

  const body = querystring.stringify({
    grant_type: "refresh_token",
    refresh_token,
  });

  const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await response.json();
  return NextResponse.json(data); 
}
