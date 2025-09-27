// Top5movies.jsx
import React, { useEffect, useState } from 'react';
import '../Top5movies/Top5movies.css';

const Top5movies = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [selectMovie, setSelectedmovie] = useState(null)
  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/top-films');
        if (!response.ok) {
          throw new Error('Failed to fetch top films');
        }

        const data = await response.json();
        setTopMovies(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchTopMovies();
  }, []);

  if (loading) return <p>Loading top movies...</p>;
  if (error) return <p>Error: {error}</p>;

  const duplicatedMovies = [...topMovies, ...topMovies, ...topMovies, ...topMovies];

  return (
    <div className="top-movies-container">
      <h2>Top 5 Rented Films of All Time</h2>

      <div className="scroller-wrapper">
        <div className="scroller">
          <div className="scroller__inner">
            {duplicatedMovies.map((movie, index) => (
                      <div
                  key={`${movie.movie_id}-${index}`}
                  className="movie-card"
                  onClick={() => setSelectedmovie(movie)} 
                >
                <div className="poster-placeholder">🎬</div>
                <h3>{movie.title}</h3>
                <p>{movie.release_year} • {movie.rating}</p>
                    </div>
            ))}
          </div>
        </div>
      </div>

      {selectMovie && (
    <div className="overlay" onClick={() => setSelectedmovie(null)}>
      <div
        className="mini-window"
        onClick={(e) => e.stopPropagation()} 
      >
        <button className="close-btn" onClick={() => setSelectedmovie(null)}>
          ❌
        </button>
        <h2>{selectMovie.title}</h2>
        <p>{selectMovie.description || "No description available"}</p>
        <p>{selectMovie.rating|| "No description available"}</p>
      </div>
    </div>
  )}
    </div>
  );
};

export default Top5movies;