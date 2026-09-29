import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import MovieIcon from "@mui/icons-material/Movie";

import { useNavigate } from "react-router-dom";

import MovieGrid from "../components/MovieGrid";
import { useMovies } from "../context/MovieContext";

function FavoritesPage() {
  const navigate = useNavigate();

  const {
    favorites,
    toggleFavorite,
  } = useMovies();

  const favoritesCount = favorites.length;

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 72px)",
        pb: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            py: { xs: 4, md: 6 },
          }}
        >
          {/* Page Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: {
                xs: "flex-start",
                sm: "center",
              },
              justifyContent: "space-between",
              gap: 2,
              mb: 5,
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  mb: 0.75,
                }}
              >
                <FavoriteIcon
                  sx={{
                    color: "error.main",
                    fontSize: 28,
                  }}
                />

                <Typography
                  component="h1"
                  variant="h4"
                  fontWeight={800}
                  sx={{
                    fontSize: {
                      xs: "1.8rem",
                      sm: "2.1rem",
                      md: "2.35rem",
                    },
                  }}
                >
                  My Favorites
                </Typography>
              </Box>

              <Typography
                color="text.secondary"
                sx={{
                  lineHeight: 1.6,
                }}
              >
                {favoritesCount === 0
                  ? "Movies you save will appear here."
                  : `${favoritesCount} ${
                      favoritesCount === 1 ? "movie" : "movies"
                    } saved`}
              </Typography>
            </Box>

            {favoritesCount > 0 && (
              <Button
                variant="outlined"
                startIcon={<MovieIcon />}
                onClick={() => navigate("/")}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 600,
                  px: 2.5,
                }}
              >
                Discover Movies
              </Button>
            )}
          </Box>

          {/* Favorites */}
          {favoritesCount > 0 ? (
            <MovieGrid
              movies={favorites}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          ) : (
            /* Empty State */
            <Box
              sx={{
                minHeight: {
                  xs: 360,
                  md: 440,
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",

                px: { xs: 3, sm: 5 },

                border: "1px dashed",
                borderColor: "divider",
                borderRadius: 4,

                background:
                  "linear-gradient(135deg, rgba(25,118,210,0.04), rgba(124,77,255,0.04))",
              }}
            >
              <Box
                sx={{
                  width: 76,
                  height: 76,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  mb: 2.5,

                  borderRadius: "50%",

                  backgroundColor:
                    "rgba(244, 67, 54, 0.08)",
                }}
              >
                <FavoriteIcon
                  sx={{
                    fontSize: 40,
                    color: "error.main",
                  }}
                />
              </Box>

              <Typography
                variant="h5"
                component="h2"
                fontWeight={800}
              >
                Your collection is empty
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                  maxWidth: 480,
                  lineHeight: 1.7,
                }}
              >
                Discover movies you love and tap the heart
                icon to build your personal collection.
              </Typography>

              <Button
                variant="contained"
                startIcon={<MovieIcon />}
                onClick={() => navigate("/")}
                sx={{
                  mt: 3,
                  px: 3,
                  py: 1.15,
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 700,
                  boxShadow: "none",

                  "&:hover": {
                    boxShadow: 4,
                  },
                }}
              >
                Explore Movies
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default FavoritesPage;