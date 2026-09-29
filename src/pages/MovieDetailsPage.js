import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import { useNavigate, useParams } from "react-router-dom";

import { getMovieDetails } from "../services/movieService";
import { useMovies } from "../context/MovieContext";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w780";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const {  toggleFavorite, isFavorite } = useMovies();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMovieDetails(movieId);
        setMovie(response.data);
      } catch (err) {
        setError("Unable to load movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 5 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || "Movie not found."}
          </Alert>

          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ textTransform: "none" }}
          >
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const trailer = movie.videos?.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official
  ) || movie.videos?.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  );

  const cast = movie.credits?.cast?.slice(0, 8) || [];

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

  return (
    <Box>
      {backdropUrl && (
        <Box
          sx={{
            height: { xs: 240, md: 380 },
            backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.25),
              rgba(0, 0, 0, 0.9)
            ), url(${backdropUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <Container maxWidth="lg">
        <Box
          sx={{
            py: 3,
            mt: backdropUrl ? { xs: -8, md: -12 } : 0,
            position: "relative",
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              mb: 3,
              color: backdropUrl ? "#fff" : "inherit",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Back
          </Button>

          <Paper
            elevation={4}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: 4,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "280px 1fr",
                },
                gap: { xs: 3, md: 4 },
              }}
            >
              <Box>
                {posterUrl ? (
                  <Box
                    component="img"
                    src={posterUrl}
                    alt={`${movie.title} poster`}
                    sx={{
                      width: "100%",
                      maxWidth: { xs: 300, md: 280 },
                      display: "block",
                      mx: { xs: "auto", md: 0 },
                      borderRadius: 3,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 420,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "action.hover",
                      borderRadius: 3,
                    }}
                  >
                    <Typography color="text.secondary">
                      Poster unavailable
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box>
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  useFlexGap
                  sx={{ mb: 2 }}
                >
                  <Chip
                    icon={<StarIcon />}
                    label={rating}
                    color="warning"
                  />

                  <Chip label={releaseYear} variant="outlined" />

                  {movie.runtime > 0 && (
                    <Chip
                      label={`${movie.runtime} min`}
                      variant="outlined"
                    />
                  )}
                </Stack>

                <Typography
                  component="h1"
                  variant="h3"
                  fontWeight={800}
                  sx={{
                    fontSize: {
                      xs: "2rem",
                      md: "2.8rem",
                    },
                  }}
                >
                  {movie.title}
                </Typography>

                {movie.tagline && (
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                      mt: 1,
                      fontStyle: "italic",
                    }}
                  >
                    {movie.tagline}
                  </Typography>
                )}

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    mt: 2,
                  }}
                >
                  {movie.genres?.map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      size="small"
                    />
                  ))}
                </Box>

                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ mt: 4, mb: 1 }}
                >
                  Overview
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ lineHeight: 1.8 }}
                >
                  {movie.overview || "No overview available."}
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ mt: 3 }}
                >
                  <Button
                    variant="contained"
                    startIcon={
                      isFavorite(movie.id) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )
                    }
                    onClick={() => toggleFavorite(movie)}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      fontWeight: 700,
                    }}
                  >
                    {isFavorite(movie.id)
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </Button>

                  {trailer && (
                    <Button
                      component="a"
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      startIcon={<PlayCircleIcon />}
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        fontWeight: 700,
                      }}
                    >
                      Watch Trailer
                    </Button>
                  )}
                </Stack>
              </Box>
            </Box>

            <Divider sx={{ my: 5 }} />

            <Typography
              component="h2"
              variant="h5"
              fontWeight={800}
              sx={{ mb: 3 }}
            >
              Top Cast
            </Typography>

            {cast.length > 0 ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(4, 1fr)",
                    md: "repeat(8, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {cast.map((actor) => {
                  const profileUrl = actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : null;

                  return (
                    <Box key={actor.id}>
                      {profileUrl ? (
                        <Box
                          component="img"
                          src={profileUrl}
                          alt={actor.name}
                          sx={{
                            width: "100%",
                            aspectRatio: "2 / 3",
                            objectFit: "cover",
                            borderRadius: 2,
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: "100%",
                            aspectRatio: "2 / 3",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            backgroundColor: "action.hover",
                            borderRadius: 2,
                            p: 1,
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            No image
                          </Typography>
                        </Box>
                      )}

                      <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{
                          mt: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {actor.name}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                         
                          mt: 0.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {actor.character}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Typography color="text.secondary">
                Cast information is unavailable.
              </Typography>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default MovieDetailsPage;