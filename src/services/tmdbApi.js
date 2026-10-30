import axios from "axios";

// TMDb supports either a v3 API key or a v4 Read Access Token.
// Prefer the Bearer token; keep the API-key fallback for existing local setups.
const accessToken = process.env.REACT_APP_TMDB_ACCESS_TOKEN;
const apiKey = process.env.REACT_APP_TMDB_API_KEY;

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 15000,
  ...(accessToken
    ? {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    : {
        params: apiKey ? { api_key: apiKey } : {},
      }),
});

tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      error.userMessage = "The movie service took too long to respond. Please try again.";
    } else if (!error.response) {
      error.userMessage = "Unable to reach the movie service. Check your internet connection.";
    } else if (error.response.status === 401) {
      error.userMessage = "TMDb rejected the API credentials. Check your TMDb access token or API key in .env.";
    } else if (error.response.status === 429) {
      error.userMessage = "The movie service is receiving too many requests. Please wait a moment.";
    } else if (error.response.status >= 500) {
      error.userMessage = "The movie service is temporarily unavailable. Please try again shortly.";
    }
    return Promise.reject(error);
  }
);

export default tmdbApi;
