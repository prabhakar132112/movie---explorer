import { useMemo, useState } from "react";

import { useMovies } from "../context/MovieContext";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import MovieFilters from "../components/MovieFilters";

import "./HomePage.css";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    movies,
    loading,
    error,
    searchQuery,
    favorites,
    genres,
    hasMore,
    loadingMore,
    searchMovieResults,
    clearSearchAndShowTrending,
    loadMoreMovies,
    toggleFavorite,
  } = useMovies();

  const isSearching = Boolean(searchQuery);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesGenre =
        !selectedGenre ||
        movie.genre_ids?.includes(Number(selectedGenre));

      const releaseYear = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : null;

      const matchesYear =
        !selectedYear ||
        releaseYear === Number(selectedYear);

      const matchesRating =
        !selectedRating ||
        movie.vote_average >= Number(selectedRating);

      return (
        matchesGenre &&
        matchesYear &&
        matchesRating
      );
    });
  }, [
    movies,
    selectedGenre,
    selectedYear,
    selectedRating,
  ]);

  const clearFilters = () => {
    setSelectedGenre("");
    setSelectedYear("");
    setSelectedRating(0);
  };

  const filtersActive =
    Boolean(selectedGenre) ||
    Boolean(selectedYear) ||
    Boolean(selectedRating);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 72px)",
        pb: { xs: 6, md: 8 },
      }}
    >
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          py: { xs: 7, sm: 9, md: 11 },
          mb: { xs: 4, md: 6 },
          background:
            "linear-gradient(135deg, rgba(25,118,210,0.16), rgba(124,77,255,0.12))",
          borderBottom: "1px solid",
          borderColor: "divider",

          "&::before": {
            content: '""',
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(25,118,210,0.12)",
            filter: "blur(70px)",
            top: -180,
            right: -100,
          },

          "&::after": {
            content: '""',
            position: "absolute",
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "rgba(124,77,255,0.1)",
            filter: "blur(70px)",
            bottom: -170,
            left: -100,
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Stack
            spacing={3}
            alignItems="center"
            textAlign="center"
          >
            {/* Badge */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 0.7,
                borderRadius: 99,
                border: "1px solid",
                borderColor: "primary.main",
                color: "primary.main",
                backgroundColor: "background.paper",
              }}
            >
              <TrendingUpIcon sx={{ fontSize: 18 }} />

              <Typography
                variant="caption"
                fontWeight={700}
                sx={{ letterSpacing: 0.7 }}
              >
                MOVIE DISCOVERY
              </Typography>
            </Box>

            {/* Hero Title */}
            <Typography
              component="h1"
              sx={{
                maxWidth: 850,
                fontSize: {
                  xs: "2.35rem",
                  sm: "3.2rem",
                  md: "4.25rem",
                },
                lineHeight: 1.05,
                fontWeight: 900,
                letterSpacing: "-2px",
              }}
            >
              Discover Your Next{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(90deg, #1976d2, #7c4dff)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Favorite Movie
              </Box>
            </Typography>

            {/* Hero Subtitle */}
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 650,
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Explore trending movies, discover new stories, and keep your
              personal favorites in one place.
            </Typography>

            {/* Search */}
            <Box
              sx={{
                width: "100%",
                maxWidth: 760,
                pt: 1,
              }}
            >
              <SearchBar
                onSearch={searchMovieResults}
                initialQuery={searchQuery}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl">

        {/* Error */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 4,
              borderRadius: 2,
            }}
          >
            {error}
          </Alert>
        )}

        {/* Section Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h2"
              fontWeight={800}
              sx={{
                fontSize: {
                  xs: "1.7rem",
                  sm: "2rem",
                  md: "2.2rem",
                },
              }}
            >
              {isSearching ? "Search Results" : "Trending Movies"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {isSearching
                ? `Results for "${searchQuery}"`
                : "Popular movies people are watching right now"}
            </Typography>
          </Box>

          {/* Back to Trending */}
          {isSearching && (
            <Button
              variant="outlined"
              startIcon={<SearchOffOutlinedIcon />}
              onClick={clearSearchAndShowTrending}
              sx={{
                borderRadius: 2,
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              Back to Trending
            </Button>
          )}
        </Stack>

        {/* Movie Filters */}
        <MovieFilters
          genres={genres}
          selectedGenre={selectedGenre}
          selectedYear={selectedYear}
          selectedRating={selectedRating}
          onGenreChange={setSelectedGenre}
          onYearChange={setSelectedYear}
          onRatingChange={setSelectedRating}
        />

        {/* Active Filter Information */}
        {filtersActive && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Showing {filteredMovies.length} filtered{" "}
              {filteredMovies.length === 1 ? "movie" : "movies"}
            </Typography>

            <Button
              size="small"
              onClick={clearFilters}
              sx={{
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Clear filters
            </Button>
          </Stack>
        )}

        {/* Movie Grid */}
        <MovieGrid
          movies={filteredMovies}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          loading={loading}
        />

        {/* Load More */}
        {!loading &&
          !filtersActive &&
          hasMore &&
          movies.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 5,
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={loadMoreMovies}
                disabled={loadingMore}
                sx={{
                  minWidth: 180,
                  borderRadius: 2,
                  px: 4,
                  py: 1.25,
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: "none",

                  "&:hover": {
                    boxShadow: 4,
                  },
                }}
              >
                {loadingMore ? (
                  <CircularProgress
                    size={24}
                    color="inherit"
                  />
                ) : (
                  "Load More"
                )}
              </Button>
            </Box>
          )}
      </Container>
    </Box>
  );
}

export default HomePage;