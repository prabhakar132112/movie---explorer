import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";

import { NavLink, useNavigate } from "react-router-dom";
import { useThemeMode } from "../context/ThemeContext";

const navigationItems = [
  {
    label: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    label: "Favorites",
    path: "/favorites",
    icon: <FavoriteIcon />,
  },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { mode, toggleTheme } = useThemeMode();

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((current) => !current);
  };

  const handleLogout = () => {
    localStorage.removeItem("movieExplorerUser");
    setMobileOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(12px)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 64, md: 72 },
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <Typography
              component={NavLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "inherit",
                textDecoration: "none",
                fontSize: {
                  xs: "1.15rem",
                  md: "1.35rem",
                },
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              <MovieFilterIcon />

              <Box component="span">
                Movie Explorer
              </Box>
            </Typography>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                alignItems: "center",
                gap: 1,
              }}
            >
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  color="inherit"
                  startIcon={item.icon}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,

                    "&.active": {
                      backgroundColor:
                        "rgba(255, 255, 255, 0.12)",
                    },

                    "&:hover": {
                      backgroundColor:
                        "rgba(255, 255, 255, 0.08)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {/* Theme Toggle */}
              <IconButton
                color="inherit"
                onClick={toggleTheme}
                aria-label={
                  mode === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
                }
                sx={{ ml: 1 }}
              >
                {mode === "light" ? (
                  <DarkModeIcon />
                ) : (
                  <LightModeIcon />
                )}
              </IconButton>

              {/* Logout */}
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  ml: 1,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Logout
              </Button>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
              aria-label="open navigation menu"
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <Box
          sx={{
            width: 280,
            height: "100%",
          }}
          role="presentation"
        >
          {/* Drawer Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1.5,
            }}
          >
            <Typography fontWeight={700}>
              Movie Explorer
            </Typography>

            <IconButton
              onClick={handleDrawerToggle}
              aria-label="close navigation menu"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* Navigation */}
          <List sx={{ px: 1, py: 2 }}>
            {navigationItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,

                  "&.active": {
                    backgroundColor: "action.selected",
                    fontWeight: 700,
                  },
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 600,
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          <Divider />

          {/* Theme */}
          <Box
            sx={{
              px: 2,
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight={600}>
              {mode === "light"
                ? "Dark Mode"
                : "Light Mode"}
            </Typography>

            <IconButton
              onClick={toggleTheme}
              aria-label={
                mode === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {mode === "light" ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </IconButton>
          </Box>

          <Divider />

          {/* Mobile Logout */}
          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;