import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";

import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import { useMovies } from "../context/MovieContext";

function HomePage() {
  const {
    movies,
    loading,
    error,
    searchQuery,
    searchMovieResults,
    clearSearchAndShowTrending,
    loadMoreMovies,
    hasMore,
    loadingMore,
    favorites,
    toggleFavorite,
  } = useMovies();

  const handleSearch = (query) => {
    searchMovieResults(query);
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          py: { xs: 4, md: 6 },
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            fontWeight={800}
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
              },
            }}
          >
            Discover Your Next Favorite Movie
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1.5,
              mb: 3,
              maxWidth: 650,
              mx: "auto",
            }}
          >
            Search thousands of movies and explore what's trending.
          </Typography>

          <SearchBar
            onSearch={handleSearch}
            initialQuery={searchQuery}
          />
        </Box>

        {/* Section Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            justifyContent: "space-between",
            gap: 2,
            mb: 3,
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <Box>
            <Typography
              component="h2"
              variant="h5"
              fontWeight={800}
            >
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : "Trending Movies"}
            </Typography>

            {!searchQuery && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Popular movies people are watching this week
              </Typography>
            )}
          </Box>

          {/* Back to Trending */}
          {searchQuery && (
            <Button
              variant="outlined"
              onClick={clearSearchAndShowTrending}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Back to Trending
            </Button>
          )}
        </Box>

        {/* API Error */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
            }}
          >
            {error}
          </Alert>
        )}

        {/* Movie Results */}
        {loading ? (
          <Box
            sx={{
              minHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Movie Grid */}
            <MovieGrid
              movies={movies}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />

            {/* Load More */}
            {hasMore && movies.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 5,
                }}
              >
                <Button
                  variant="contained"
                  onClick={loadMoreMovies}
                  disabled={loadingMore}
                  sx={{
                    minWidth: 160,
                    py: 1.2,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  {loadingMore ? (
                    <>
                      <CircularProgress
                        size={22}
                        color="inherit"
                        sx={{ mr: 1 }}
                      />
                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default HomePage;