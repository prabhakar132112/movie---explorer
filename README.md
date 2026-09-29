# 🎬 Movie Explorer

A responsive movie discovery application built with React, Material UI, and the TMDb API.

Movie Explorer allows users to discover trending movies, search for movies, view detailed information, watch trailers, and save favorite movies locally.

## ✨ Features

- 🔐 Login UI with username and password
- 🔎 Search movies using the TMDb API
- 🔥 Browse trending movies
- 🎬 Movie details including:
  - Title
  - Release date
  - Rating
  - Genres
  - Runtime
  - Overview
  - Top cast
  - Trailer
- ❤️ Add and remove favorite movies
- 💾 Favorites stored in localStorage
- 🔄 Last searched movie restored after refresh
- ➕ Load More pagination
- 🌙 Light and dark mode
- 📱 Mobile-first responsive design
- 🧭 React Router navigation
- ⚛️ React Context API for shared application state
- ⚠️ API error handling
- ♻️ Reusable React components

## 🛠️ Tech Stack

- React
- Create React App
- Material UI (MUI)
- React Router
- React Context API
- Axios
- TMDb API
- JavaScript
- CSS-in-JS through Material UI
- localStorage

## 📁 Project Structure

```text
movie-explorer/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── MovieCard.js
│   │   ├── MovieGrid.js
│   │   └── SearchBar.js
│   │
│   ├── context/
│   │   ├── MovieContext.js
│   │   └── ThemeContext.js
│   │
│   ├── pages/
│   │   ├── FavoritesPage.js
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   └── MovieDetailsPage.js
│   │
│   ├── services/
│   │   ├── movieService.js
│   │   └── tmdbApi.js
│   │
│   ├── App.js
│   └── index.js
│
├── .gitignore
├── package.json
└── README.md