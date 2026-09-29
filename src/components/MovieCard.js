import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";

import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

  const handleMovieClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    onToggleFavorite(movie);
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea
        onClick={handleMovieClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          height: "100%",
        }}
      >
        {/* Poster */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "2 / 3",
            backgroundColor: "action.hover",
          }}
        >
          {posterUrl ? (
            <CardMedia
              component="img"
              image={posterUrl}
              alt={`${movie.title} poster`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
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
                Poster unavailable
              </Typography>
            </Box>
          )}

          {/* Rating */}
          <Chip
            icon={<StarIcon />}
            label={rating}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              fontWeight: 700,
              backgroundColor: "rgba(0, 0, 0, 0.78)",
              color: "#fff",

              "& .MuiChip-icon": {
                color: "#ffc107",
              },
            }}
          />

          {/* Favorite */}
          <IconButton
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite
                ? `Remove ${movie.title} from favorites`
                : `Add ${movie.title} to favorites`
            }
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              color: "#fff",

              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.85)",
              },
            }}
          >
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Box>

        {/* Information */}
        <CardContent
          sx={{
            flexGrow: 1,
            width: "100%",
            p: 2,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            fontWeight={700}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.3,
              minHeight: "2.6em",
            }}
          >
            {movie.title || "Untitled Movie"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
            }}
          >
            {releaseYear}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;