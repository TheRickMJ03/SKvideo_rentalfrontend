// Top5actors.jsx
import React, { useEffect, useState } from 'react';
import '../Top5actors/Top5actors.css';

const Top5actors = () => {
  const [topactors, setTopactors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedActor, setSelectedActor] = useState(null);
  const [topFilms, setTopFilms] = useState([]);
  const [filmsLoading, setFilmsLoading] = useState(false);
  useEffect(() => {
    const fetchTopactors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/top-actors');
        if (!response.ok) {
          throw new Error('Failed to fetch top actors');
        }

        const data = await response.json();
        setTopactors(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchTopactors();
  }, []);

  useEffect(() => {
    if (!selectedActor) return;

    const fetchTopFilms = async () => {
      setFilmsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/actors/${selectedActor.actor_id}/top-films`
        );
        if (!response.ok) throw new Error("Failed to fetch top films");
        const data = await response.json();
        setTopFilms(data);
      } catch (err) {
        console.error(err);
        setTopFilms([]);
      } finally {
        setFilmsLoading(false);
      }
    };

    fetchTopFilms();
  }, [selectedActor]);

  if (loading) return <p>Loading top actors...</p>;
  if (error) return <p>Error: {error}</p>;

  const duplicatedactors = [...topactors, ...topactors, ...topactors, ...topactors];

  return (
   <div className="top-actors-container">
  <h2>Top 5 Actors of All Time</h2>

  <div className="scroller-wrapper">
    <div className="scroller">
      <div className="scroller__inner">
        {duplicatedactors.map((actor, index) => (
          <div
            key={`${actor.actor_id}-${index}`}
            className="actors-card"
            onClick={() => setSelectedActor(actor)} 
          >
            <div className="poster-placeholder">🎭</div>
            <h3>{actor.actor_name}</h3>
            <p>{actor.film_count} films</p>
          </div>
        ))}
      </div>
    </div>
  </div>

      {selectedActor && (
        <div className="overlay" onClick={() => setSelectedActor(null)}>
          <div
            className="mini-window"
            onClick={(e) => e.stopPropagation()} 
          >
            <button className="close-btn" onClick={() => setSelectedActor(null)}>
              ❌
            </button>

            <h2>{selectedActor.actor_name}</h2>
            <p>TOP FILMS:</p>
            {filmsLoading ? (
              <p>Loading top films...</p>
            ) : topFilms.length > 0 ? (
              
              <ul>
                {topFilms.map((film) => (
                  <li key={film.film_id}>
                     {film.title} ({film.rental_count} rentals)
                  </li>
                ))}
              </ul>
            ) : (
              <p>No top films available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Top5actors;
