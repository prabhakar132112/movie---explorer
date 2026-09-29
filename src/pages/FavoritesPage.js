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

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          py: { xs: 4, md: 6 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            justifyContent: "space-between",
            gap: 2,
            mb: 4,
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <Box>
            <Typography
              component="h1"
              variant="h4"
              fontWeight={800}
            >
              My Favorites
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {favorites.length === 0
                ? "Movies you save will appear here."
                : `${favorites.length} ${
                    favorites.length === 1 ? "movie" : "movies"
                  } saved`}
            </Typography>
          </Box>

          {favorites.length > 0 && (
            <Button
              variant="outlined"
              startIcon={<MovieIcon />}
              onClick={() => navigate("/")}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Discover Movies
            </Button>
          )}
        </Box>

        {favorites.length > 0 ? (
          <MovieGrid
            movies={favorites}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        ) : (
          <Box
            sx={{
              minHeight: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              border: "1px dashed",
              borderColor: "divider",
              borderRadius: 4,
              px: 3,
            }}
          >
            <FavoriteIcon
              sx={{
                fontSize: 64,
                color: "text.secondary",
                mb: 2,
              }}
            />

            <Typography
              variant="h5"
              fontWeight={700}
            >
              No favorites yet
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
                maxWidth: 450,
              }}
            >
              Explore movies and tap the heart icon to
              save your favorites.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{
                mt: 3,
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 700,
              }}
            >
              Explore Movies
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default FavoritesPage;