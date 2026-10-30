import { useState } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Button, Drawer, List, ListItemButton, ListItemText, Divider, Tooltip, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import { useThemeMode } from "../context/ThemeContext";
import { useMovies } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useThemeMode();
  const { favorites } = useMovies();
  const { signOut, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigation = path => { navigate(path); setMobileOpen(false); };
  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) console.error("Sign out failed:", error.message);
    else navigate("/login", { replace: true });
  };
  const isActive = path => location.pathname === path;
  const navItems = [
    { label: "Home", path: "/dashboard", icon: <HomeOutlinedIcon /> },
    { label: "Favorites", path: "/dashboard/favorites", icon: <Badge badgeContent={favorites.length} color="error" max={99} invisible={!favorites.length}><FavoriteBorderIcon /></Badge> },
  ];

  return <>
    <AppBar position="sticky" elevation={0} sx={{ backdropFilter: "blur(14px)", backgroundColor: mode === "dark" ? "rgba(18,18,18,0.88)" : "rgba(255,255,255,0.92)", color: "text.primary", borderBottom: "1px solid", borderColor: "divider" }}>
      <Toolbar sx={{ minHeight: { xs: 64, md: 72 }, px: { xs: 2, sm: 3, md: 5 }, display: "flex", justifyContent: "space-between" }}>
        <Box onClick={() => handleNavigation("/dashboard")} sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", userSelect: "none" }}>
          <Box sx={{ width: 38, height: 38, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1976d2 0%,#7c4dff 100%)", color: "#fff" }}><MovieOutlinedIcon /></Box>
          <Typography variant="h6" sx={{ fontWeight: 800, display: { xs: "none", sm: "block" } }}>Movie Explorer</Typography>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
          {navItems.map(item => <Button key={item.path} startIcon={item.icon} onClick={() => handleNavigation(item.path)} sx={{ px: 2, py: 1, borderRadius: 2, fontWeight: 600, color: isActive(item.path) ? "primary.main" : "text.secondary", backgroundColor: isActive(item.path) ? "action.selected" : "transparent" }}>{item.label}</Button>)}
          <Tooltip title={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}><IconButton onClick={toggleTheme} aria-label="Toggle theme">{mode === "light" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}</IconButton></Tooltip>
          <Typography variant="caption" color="text.secondary" sx={{ maxWidth: 170, overflow: "hidden", textOverflow: "ellipsis" }}>{user?.email}</Typography>
          <Button variant="outlined" color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout} sx={{ ml: 1, borderRadius: 2, fontWeight: 600 }}>Logout</Button>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 0.5 }}>
          <IconButton onClick={toggleTheme} aria-label="Toggle theme" color="inherit">{mode === "light" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}</IconButton>
          <IconButton onClick={() => setMobileOpen(true)} aria-label="Open navigation menu" color="inherit"><MenuIcon /></IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)} PaperProps={{ sx: { width: { xs: "82%", sm: 320 }, maxWidth: 360 } }}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}><Typography variant="h6" fontWeight={800}>Menu</Typography><IconButton onClick={() => setMobileOpen(false)} aria-label="Close navigation menu"><CloseIcon /></IconButton></Box>
        <Divider />
        <List sx={{ py: 1 }}>{navItems.map(item => <ListItemButton key={item.path} selected={isActive(item.path)} onClick={() => handleNavigation(item.path)} sx={{ borderRadius: 2, mb: 0.5 }}><Box sx={{ mr: 2, display: "flex" }}>{item.icon}</Box><ListItemText primary={item.label} /></ListItemButton>)}</List>
        <Divider sx={{ my: 1 }} />
        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2 }}><Box sx={{ mr: 2, display: "flex" }}><LogoutIcon /></Box><ListItemText primary="Logout" /></ListItemButton>
      </Box>
    </Drawer>
  </>;
}
