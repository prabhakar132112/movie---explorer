import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import "./MovieFilters.css";

function MovieFilters({
  genres,
  selectedGenre,
  selectedYear,
  selectedRating,
  onGenreChange,
  onYearChange,
  onRatingChange,
}) {
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 1980 + 1 },
    (_, index) => currentYear - index
  );

  const ratings = [
    { value: 0, label: "Any rating" },
    { value: 5, label: "5+ ⭐" },
    { value: 6, label: "6+ ⭐" },
    { value: 7, label: "7+ ⭐" },
    { value: 8, label: "8+ ⭐" },
    { value: 9, label: "9+ ⭐" },
  ];

  return (
    <Box className="movie-filters">
      <Box className="movie-filters__header">
        <FilterAltOutlinedIcon className="movie-filters__icon" />

        <Typography className="movie-filters__title">
          Filter Movies
        </Typography>
      </Box>

      <Stack className="movie-filters__controls">
        <FormControl
          className="movie-filters__control"
          fullWidth
          size="small"
        >
          <InputLabel>Genre</InputLabel>

          <Select
            value={selectedGenre}
            label="Genre"
            onChange={(event) =>
              onGenreChange(event.target.value)
            }
          >
            <MenuItem value="">
              All genres
            </MenuItem>

            {genres.map((genre) => (
              <MenuItem
                key={genre.id}
                value={genre.id}
              >
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          className="movie-filters__control"
          fullWidth
          size="small"
        >
          <InputLabel>Year</InputLabel>

          <Select
            value={selectedYear}
            label="Year"
            onChange={(event) =>
              onYearChange(event.target.value)
            }
          >
            <MenuItem value="">
              All years
            </MenuItem>

            {years.map((year) => (
              <MenuItem
                key={year}
                value={year}
              >
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          className="movie-filters__control"
          fullWidth
          size="small"
        >
          <InputLabel>Rating</InputLabel>

          <Select
            value={selectedRating}
            label="Rating"
            onChange={(event) =>
              onRatingChange(event.target.value)
            }
          >
            {ratings.map((rating) => (
              <MenuItem
                key={rating.value}
                value={rating.value}
              >
                {rating.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
}

export default MovieFilters;