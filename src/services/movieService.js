import tmdbApi from "./tmdbApi";

export const getTrendingMovies = (page = 1) =>
  tmdbApi.get("/trending/movie/week", { params: { page } });

export const getPopularMovies = (page = 1) =>
  tmdbApi.get("/movie/popular", { params: { page } });

export const getUpcomingMovies = (page = 1) =>
  tmdbApi.get("/movie/upcoming", { params: { page } });

export const getTopRatedMovies = (page = 1) =>
  tmdbApi.get("/movie/top_rated", { params: { page } });

export const discoverMovies = (filters = {}, page = 1) =>
  tmdbApi.get("/discover/movie", { params: { ...filters, page } });

export const searchMovies = (query, page = 1) =>
  tmdbApi.get("/search/movie", { params: { query, page } });

export const getMovieDetails = (movieId) =>
  tmdbApi.get(`/movie/${movieId}`, {
    params: { append_to_response: "credits,videos,recommendations,similar" },
  });

export const getMovieGenres = () =>
  tmdbApi.get("/genre/movie/list");

export const getMovieProviders = (movieId, region = "IN") =>
  tmdbApi.get(`/movie/${movieId}/watch/providers`, { params: { watch_region: region } });
