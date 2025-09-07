
export async function getValidAccessToken(): Promise<string | null> {
  let accessToken = String (localStorage.getItem("spotify_access_token"))
  const refreshToken = localStorage.getItem("spotify_refresh_token");
  const expiryTime = Number(localStorage.getItem("spotify_token_expiry"));


  if (!accessToken || Date.now() > expiryTime - 60000) {
    if (!refreshToken) return null;

    try {
    
      const res = await fetch(`/api/spotify/refresh?refresh_token=${refreshToken}`);
      const data = await res.json();

      if (!res.ok || !data.access_token) {
        console.error("Failed to refresh Spotify token:", data);
        return null;
      }

      accessToken = data.access_token;
      const newExpiry = Date.now() + data.expires_in * 1000;

      localStorage.setItem("spotify_access_token", accessToken);
      localStorage.setItem("spotify_token_expiry", newExpiry.toString());
    } catch (err) {
      console.error("Error refreshing Spotify token:", err);
      return null;
    }
  }

  return accessToken;
}

/**
 * Wrapper for making Spotify API calls.
 * Automatically handles token refresh and expiry.
 */
export async function spotifyFetch(url: string, options: RequestInit = {}) {
  const token = await getValidAccessToken();
  if (!token) throw new Error("No valid Spotify token available");

  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error?.message || `Spotify API Error: ${res.status}`);
  }

  return res.json();
}


export function saveTokensFromUrl() {

  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");
  const expiresIn = params.get("expires_in");

  if (accessToken) {
    localStorage.setItem("spotify_access_token", accessToken);
  
    if (expiresIn) {
      const expiry = Date.now() + Number(expiresIn) * 1000;
      localStorage.setItem("spotify_token_expiry", expiry.toString());
    }
  }

  if (refreshToken) localStorage.setItem("spotify_refresh_token", refreshToken);
}
