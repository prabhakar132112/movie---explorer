import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getTrendingMovies,
  searchMovies,
} from "../services/movieService";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem("lastSearchedMovie") || "";
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("movieFavorites");

    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Save favorites
  useEffect(() => {
    localStorage.setItem(
      "movieFavorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // Load trending movies
  const fetchTrendingMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTrendingMovies(1);

      setMovies(response.data.results || []);
      setCurrentPage(1);

      setHasMore(
        response.data.page < response.data.total_pages
      );
    } catch (err) {
      setError(
        "Unable to load movies. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Search movies
  const searchMovieResults = useCallback(
    async (query) => {
      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        localStorage.removeItem("lastSearchedMovie");
        setSearchQuery("");
        await fetchTrendingMovies();
        return;
      }

      try {
        setLoading(true);
        setError("");

        setSearchQuery(trimmedQuery);

        localStorage.setItem(
          "lastSearchedMovie",
          trimmedQuery
        );

        const response = await searchMovies(
          trimmedQuery,
          1
        );

        setMovies(response.data.results || []);
        setCurrentPage(1);

        setHasMore(
          response.data.page < response.data.total_pages
        );
      } catch (err) {
        setError(
          "Unable to search movies. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchTrendingMovies]
  );

  // Clear search
  const clearSearchAndShowTrending = async () => {
    localStorage.removeItem("lastSearchedMovie");

    setSearchQuery("");
    setError("");

    await fetchTrendingMovies();
  };

  // Load next page
  const loadMoreMovies = async () => {
    if (loadingMore || !hasMore) {
      return;
    }

    try {
      setLoadingMore(true);
      setError("");

      const nextPage = currentPage + 1;

      let response;

      if (searchQuery) {
        response = await searchMovies(
          searchQuery,
          nextPage
        );
      } else {
        response = await getTrendingMovies(nextPage);
      }

      const newMovies = response.data.results || [];

      setMovies((currentMovies) => {
        const existingIds = new Set(
          currentMovies.map((movie) => movie.id)
        );

        const uniqueMovies = newMovies.filter(
          (movie) => !existingIds.has(movie.id)
        );

        return [...currentMovies, ...uniqueMovies];
      });

      setCurrentPage(nextPage);

      setHasMore(
        response.data.page < response.data.total_pages
      );
    } catch (err) {
      setError(
        "Unable to load more movies. Please try again."
      );
    } finally {
      setLoadingMore(false);
    }
  };

  // Add/remove favorites
  const toggleFavorite = (movie) => {
    setFavorites((current) => {
      const exists = current.some(
        (item) => item.id === movie.id
      );

      if (exists) {
        return current.filter(
          (item) => item.id !== movie.id
        );
      }

      return [...current, movie];
    });
  };

  const isFavorite = (movieId) =>
    favorites.some(
      (movie) => movie.id === movieId
    );

  // Restore last search after refresh
  useEffect(() => {
    const savedSearch =
      localStorage.getItem("lastSearchedMovie");

    if (savedSearch) {
      searchMovieResults(savedSearch);
    } else {
      fetchTrendingMovies();
    }
  }, [searchMovieResults, fetchTrendingMovies]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        loading,
        error,
        searchQuery,
        favorites,

        currentPage,
        hasMore,
        loadingMore,

        fetchTrendingMovies,
        searchMovieResults,
        clearSearchAndShowTrending,
        loadMoreMovies,

        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  return useContext(MovieContext);
}