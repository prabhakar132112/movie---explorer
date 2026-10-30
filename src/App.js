import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";

function ProtectedLayout({ children }) {
  return <ProtectedRoute><Header />{children}</ProtectedRoute>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedLayout><HomePage /></ProtectedLayout>} />
        <Route path="/dashboard/movie/:movieId" element={<ProtectedLayout><MovieDetailsPage /></ProtectedLayout>} />
        <Route path="/dashboard/favorites" element={<ProtectedLayout><FavoritesPage /></ProtectedLayout>} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/movie/:movieId" element={<Navigate to="/dashboard" replace />} />
        <Route path="/favorites" element={<Navigate to="/dashboard/favorites" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
