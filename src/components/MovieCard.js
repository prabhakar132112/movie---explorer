import {
  Card,
  CardActionArea,
  Typography,
  Box,
  IconButton,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";

import { useNavigate } from "react-router-dom";

import "./MovieCard.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  const rating =
    typeof movie.vote_average === "number" && movie.vote_average > 0
      ? movie.vote_average.toFixed(1)
      : "N/A";

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const handleFavorite = (event) => {
    event.stopPropagation();
    onToggleFavorite(movie);
  };

  const handleMovieClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card className="movie-card">
      <Box className="movie-card__poster-wrapper">
        <CardActionArea
          onClick={handleMovieClick}
          aria-label={`View details for ${movie.title}`}
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          {posterUrl ? (
            <img
              className="movie-card__poster"
              src={posterUrl}
              alt={`${movie.title} poster`}
              loading="lazy"
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                aspectRatio: "2 / 3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                No poster available
              </Typography>
            </Box>
          )}
        </CardActionArea>

        {/* Rating */}
        <Box
          className="movie-card__rating"
          aria-label={`Rating ${rating} out of 10`}
        >
          <StarIcon
            sx={{
              fontSize: 15,
              color: "#ffc107",
            }}
          />

          {rating}
        </Box>

        {/* Favorite */}
        <IconButton
          className={`movie-card__favorite ${
            isFavorite ? "movie-card__favorite--active" : ""
          }`}
          onClick={handleFavorite}
          aria-label={
            isFavorite
              ? `Remove ${movie.title} from favorites`
              : `Add ${movie.title} to favorites`
          }
        >
          {isFavorite ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Box>

      {/* Movie information */}
      <Box className="movie-card__content">
        <Typography
          component="h3"
          className="movie-card__title"
          title={movie.title}
        >
          {movie.title}
        </Typography>

        <Box className="movie-card__meta">
          <Typography
            component="span"
            className="movie-card__year"
          >
            {releaseYear}
          </Typography>

          <Typography
            component="span"
            className="movie-card__type"
          >
            Movie
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default MovieCard;