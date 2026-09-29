import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("movieExplorerUser");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <>
                <Header />

                <Routes>
                  <Route path="/" element={<HomePage />} />

                  <Route
                    path="/movie/:movieId"
                    element={<MovieDetailsPage />}
                  />

                  <Route
                    path="/favorites"
                    element={<FavoritesPage />}
                  />

                  <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                  />
                </Routes>
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;