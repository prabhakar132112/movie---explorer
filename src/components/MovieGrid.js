import { Grid, Typography } from "@mui/material";
import MovieCard from "./MovieCard";

function MovieGrid({ movies, favorites, onToggleFavorite }) {
  if (!movies.length) {
    return (
      <Typography
        variant="h6"
        color="text.secondary"
        textAlign="center"
        sx={{ py: 8 }}
      >
        No movies found.
      </Typography>
    );
  }

  const isFavorite = (movieId) =>
    favorites.some((movie) => movie.id === movieId);

  return (
    <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
      {movies.map((movie) => (
        <Grid
          key={movie.id}
          size={{
            xs: 6,
            sm: 4,
            md: 3,
            lg: 2.4,
          }}
        >
          <MovieCard
            movie={movie}
            isFavorite={isFavorite(movie.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieGrid;