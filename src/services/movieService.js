import tmdbApi from "./tmdbApi";

export const getTrendingMovies = (page = 1) =>
  tmdbApi.get("/trending/movie/week", {
    params: {
      page,
    },
  });

export const searchMovies = (query, page = 1) =>
  tmdbApi.get("/search/movie", {
    params: {
      query,
      page,
    },
  });

export const getMovieDetails = (movieId) =>
  tmdbApi.get(`/movie/${movieId}`, {
    params: {
      append_to_response: "credits,videos",
    },
  });