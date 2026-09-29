import { Box } from "@mui/material";

function MovieSkeleton() {
  return (
    <Box className="movie-skeleton">
      <Box className="movie-skeleton__poster skeleton" />

      <Box className="movie-skeleton__content">
        <Box className="movie-skeleton__title skeleton" />
        <Box className="movie-skeleton__meta skeleton" />
      </Box>
    </Box>
  );
}

export default MovieSkeleton;