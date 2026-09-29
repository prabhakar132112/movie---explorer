import { useState } from "react";

import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";

import { useNavigate } from "react-router-dom";

import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    localStorage.setItem(
      "movieExplorerUser",
      JSON.stringify({
        username: username.trim(),
      })
    );

    navigate("/");
  };

  return (
    <Box className="login-page">
      {/* Cinematic Background */}
      <Box className="login-page__background">
        <Box className="login-page__glow login-page__glow--one" />
        <Box className="login-page__glow login-page__glow--two" />
        <Box className="login-page__glow login-page__glow--three" />

        <Box className="login-page__film-strip">
          {Array.from({ length: 12 }).map((_, index) => (
            <Box
              key={index}
              className="login-page__film-frame"
            />
          ))}
        </Box>
      </Box>

      <Container
        maxWidth="lg"
        className="login-page__container"
      >
        {/* Brand / Introduction */}
        <Box className="login-page__intro">
          <Box className="login-page__brand">
            <Box className="login-page__brand-icon">
              <MovieFilterIcon />
            </Box>

            <Typography
              component="span"
              className="login-page__brand-name"
            >
              Movie Explorer
            </Typography>
          </Box>

          <Typography
            component="h1"
            className="login-page__headline"
          >
            Your next
            <span> great story </span>
            starts here.
          </Typography>

          <Typography className="login-page__description">
            Discover trending movies, explore new worlds,
            and build a collection of stories worth watching.
          </Typography>

          <Box className="login-page__feature">
            <PlayCircleOutlineRoundedIcon />

            <Box>
              <Typography
                component="p"
                className="login-page__feature-title"
              >
                Discover. Explore. Save.
              </Typography>

              <Typography
                component="p"
                className="login-page__feature-text"
              >
                Everything you love about movies, in one place.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Login Card */}
        <Paper
          component="section"
          elevation={0}
          className="login-card"
        >
          <Box className="login-card__header">
            <Box className="login-card__icon">
              <MovieFilterIcon />
            </Box>

            <Typography
              component="h2"
              className="login-card__title"
            >
              Welcome back
            </Typography>

            <Typography className="login-card__subtitle">
              Sign in to continue exploring.
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            className="login-card__form"
          >
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError("");
              }}
              autoComplete="username"
              required
              className="login-card__field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              autoComplete="current-password"
              required
              className="login-card__field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          (current) => !current
                        )
                      }
                      edge="end"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography
                color="error"
                variant="body2"
                className="login-card__error"
              >
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              className="login-card__submit"
            >
              Enter Movie Explorer
            </Button>
          </Box>

          
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;