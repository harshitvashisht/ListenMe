"use client";
import { useState } from "react";

export default function SpotifySearch() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchTracks = async () => {
    const accessToken = localStorage.getItem("spotify_access_token");
    if (!accessToken) {
      setError("No access token found");
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTracks(data.tracks.items);
        setError(null);
      } else {
        setError(data.error?.message || "Failed to fetch tracks");
      }
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
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
      <button onClick={searchTracks}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {tracks.map((track) => (
        <div key={track.id}>
          <img src={track.album.images?.[0]?.url} alt={track.name} width={100} />
          <p>
            {track.name} — {track.artists.map((a: any) => a.name).join(", ")}
          </p>
          <audio controls src={track.preview_url}>
            Your browser does not support the audio element.
          </audio>
        </div>
      ))}
    </div>
  );
}
