
import { useEffect, useState } from "react";
import { spotifyFetch, saveTokensFromUrl } from "../utils/listenauth";
import  Player  from "./player";

export default function SpotifySearch() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    saveTokensFromUrl();
    setReady(true);
  }, []);

  const searchTracks = async () => {
    if (!ready) {
      setError("Tokens not ready yet. Please try again.");
      return;
    }

    if (!query.trim()) {
      setError("Please enter a search query");
      return;
    }

    try {
      const data = await spotifyFetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`
      );
      setTracks(data.tracks.items);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch tracks");
    }
  };

  return (
    <div>
      <h2>Search Spotify Songs</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter song name"
      />
      <button onClick={searchTracks} disabled={!ready}>
        {ready ? "Search" : "Loading..."}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {tracks.map((track) => (
        <div key={track.id}>
          <img className="cursor-pointer" src={track.album.images?.[0]?.url} alt={track.name} width={100} />
          <p>
            {track.name} — {track.artists.map((a: any) => a.name).join(", ")}
          </p>
          <Player accessToken={localStorage.getItem('spotify_access_token')} trackuri={undefined}/>
        </div>
      ))}
    </div>
  );
}
