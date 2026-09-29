import "./SearchBar.css";
import { useEffect, useState } from "react";

import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function SearchBar({ onSearch, initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);

  // Keep SearchBar synchronized with MovieContext
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <Box
      component="form"
      className="search-bar"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: 720,
        mx: "auto",
      }}
    >
      <TextField
        className="search-bar__field"
        fullWidth
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for movies..."
        aria-label="Search for movies"
        variant="outlined"
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="search-bar__icon"  />
            </InputAdornment>
          ),

          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton
               className="search-bar__clear"
                type="button"
                onClick={handleClear}
                aria-label="Clear search"
                edge="end"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            backgroundColor: "background.paper",
          },
        }}
      />
    </Box>
  );
}

export default SearchBar;