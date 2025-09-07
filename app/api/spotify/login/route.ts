import { NextResponse } from "next/server";
import querystring from "querystring";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const redirect_uri = "http://127.0.0.1:3000/api/spotify/callback";

function generateRandomString(length: number) {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export async function GET() {
  const state = generateRandomString(16);

  const scope = "user-read-private user-read-email user-library-read streaming";


  const url = "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id,
      redirect_uri,
      state,
      scope,
      show_dialog: true,
    });

  return NextResponse.redirect(url);
}
