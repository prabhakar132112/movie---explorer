import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Box, Button, CircularProgress, Container, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const { user, loading: authLoading, signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  if (!authLoading && user) navigate("/dashboard", { replace: true });
  const destination = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); setMessage("");
    if (!email.trim() || !password) return setError("Enter your email address and password.");
    if (password.length < 6) return setError("Password must contain at least 6 characters.");
    setBusy(true);
    try {
      const { data, error: authError } = mode === "signin"
        ? await signIn(email.trim(), password)
        : await signUp(email.trim(), password);
      if (authError) throw authError;
      if (mode === "signup" && !data.session) {
        setMessage("Account created. Check your email to confirm your address, then sign in.");
      } else navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally { setBusy(false); }
  };

  const handleGoogle = async () => {
    setError(""); setBusy(true);
    try {
      const { error: authError } = await signInWithGoogle();
      if (authError) throw authError;
    } catch (err) {
      setError(err.message || "Google sign-in could not be started.");
      setBusy(false);
    }
  };

  return (
    <Box className="login-page">
      <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "grid", placeItems: "center", py: 4 }}>
        <Paper elevation={0} className="login-card" sx={{ width: "100%", p: { xs: 3, sm: 5 }, borderRadius: 4 }}>
          <Stack spacing={2.5}>
            <Stack spacing={1} alignItems="center" textAlign="center">
              <Box sx={{ width: 54, height: 54, borderRadius: 3, display: "grid", placeItems: "center", color: "white", background: "linear-gradient(135deg, #1976d2, #7c4dff)" }}><MovieFilterIcon /></Box>
              <Typography variant="h4" fontWeight={850}>Movie Explorer</Typography>
              <Typography color="text.secondary">{mode === "signin" ? "Sign in to continue exploring." : "Create an account to save your movie discoveries."}</Typography>
            </Stack>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField fullWidth label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required />
                <TextField fullWidth label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete={mode === "signin" ? "current-password" : "new-password"} inputProps={{ minLength: 6 }} required />
                <Button type="submit" fullWidth variant="contained" size="large" disabled={busy} sx={{ py: 1.3, borderRadius: 2, fontWeight: 700 }}>
                  {busy ? <CircularProgress size={24} color="inherit" /> : mode === "signin" ? "Sign in" : "Create account"}
                </Button>
              </Stack>
            </Box>
            <Divider>OR</Divider>
            <Button fullWidth variant="outlined" size="large" startIcon={<GoogleIcon />} onClick={handleGoogle} disabled={busy} sx={{ py: 1.2, borderRadius: 2, fontWeight: 700 }}>Continue with Google</Button>
            <Typography textAlign="center" variant="body2" color="text.secondary">
              {mode === "signin" ? "New to Movie Explorer?" : "Already have an account?"}{" "}
              <Button size="small" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); setMessage(""); }}>
                {mode === "signin" ? "Create account" : "Sign in"}
              </Button>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
