// Top5actors.jsx
import React, { useEffect, useState } from 'react';
// Importing CSS for styling
import '../Top5actors/Top5actors.css';

const Top5actors = () => {
  // State to store top actors fetched from API
  const [topactors, setTopactors] = useState([]);
  // State to manage loading status for top actors
  const [loading, setLoading] = useState(true);
  // State to store any error that occurs during fetching
  const [error, setError] = useState(null);
  // State to store the currently selected actor
  const [selectedActor, setSelectedActor] = useState(null);
  // State to store top films of the selected actor
  const [topFilms, setTopFilms] = useState([]);
  // State to manage loading status for top films
  const [filmsLoading, setFilmsLoading] = useState(false);

  // Fetch top actors on component mount
  useEffect(() => {
    const fetchTopactors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/top-actors');
        if (!response.ok) {
          throw new Error('Failed to fetch top actors');
        }

        const data = await response.json();
        setTopactors(data); // Set top actors data
      } catch (err) {
        console.error(err);
        setError(err.message || 'Something went wrong'); // Set error message
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchTopactors();
  }, []);

  // Fetch top films when an actor is selected
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
        setTopFilms(data); // Set top films for the selected actor
      } catch (err) {
        console.error(err);
        setTopFilms([]); // Clear films if fetch fails
      } finally {
        setFilmsLoading(false); // End loading state
      }
    };

    fetchTopFilms();
  }, [selectedActor]);

  // Show loading or error messages if needed
  if (loading) return <p>Loading top actors...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div className="top-actors-container">
      <h2>Top 5 Actors of All Time</h2>

      {/* Scrollable actor cards container */}
    <div className="actors-grid">
  {topactors.map((actor) => (
    <div
      key={actor.actor_id}
      className="actors-card"
      onClick={() => setSelectedActor(actor)}
    >
      <div className="poster-placeholder">🎭</div>
      <h3>{actor.actor_name}</h3>
      <p>{actor.film_count} films</p>
    </div>
  ))}
</div>

      {/* Mini popup window showing top films for selected actor */}
      {selectedActor && (
        <div className="overlay" onClick={() => setSelectedActor(null)}>
          <div
            className="mini-window"
            onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing popup
          >
            <button className="close-btn" onClick={() => setSelectedActor(null)}>
              ❌
            </button>

            <h2>{selectedActor.actor_name}</h2>
            <p>TOP FILMS:</p>

            {/* Conditional rendering based on film loading and results */}
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
