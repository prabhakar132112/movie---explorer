import { Typography, Box } from "@mui/material";

import MovieCard from "./MovieCard";
import MovieSkeleton from "./MovieSkeleton";

import "./MovieGrid.css";

function MovieGrid({
  movies,
  favorites,
  onToggleFavorite,
  loading = false,
}) {
  if (loading) {
    return (
      <Box className="movie-grid">
        <Box className="movie-grid__items">
          {Array.from({ length: 10 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </Box>
      </Box>
    );
  }

 if (!movies.length) {
  return (
    <Box className="movie-grid__empty">
      <Box className="movie-grid__empty-icon">
        <Typography component="span">🎬</Typography>
      </Box>

      <Typography
        component="h3"
        className="movie-grid__empty-title"
      >
        No movies found
      </Typography>

      <Typography
        component="p"
        className="movie-grid__empty-text"
      >
        Try searching with a different movie title or keyword.
      </Typography>
    </Box>
  );
}
  const isFavorite = (movieId) =>
    favorites.some((movie) => movie.id === movieId);

  return (
    <Box className="movie-grid">
      <Box className="movie-grid__items">
        {movies.map((movie, index) => (
          <Box
            key={movie.id}
            className="stagger-item"
            style={{
              animationDelay: `${Math.min(index, 7) * 40}ms`,
            }}
          >
            <MovieCard
              movie={movie}
              isFavorite={isFavorite(movie.id)}
              onToggleFavorite={onToggleFavorite}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default MovieGrid;