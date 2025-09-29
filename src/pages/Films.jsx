import React, { useEffect, useState } from "react";
import "./Films.css"; // Import external CSS for styling

const Films = () => {
  // State variables for storing all necessary data
  const [films, setFilms] = useState([]); // Stores the list of films fetched from the backend
  const [searchTerm, setSearchTerm] = useState(""); // Holds user input for search filtering
  const [loading, setLoading] = useState(true); // Loading state for fetching films
  const [error, setError] = useState(""); // Error message for fetch failures
  const [selectedFilm, setSelectedFilm] = useState(null); // Currently selected film (for popup modal)
  const [customerId, setCustomerId] = useState(""); // Customer ID entered for renting a film
  const [renting, setRenting] = useState(false); // Whether the app is in the process of renting
  const [rentMessage, setRentMessage] = useState(""); // Message after rent attempt (success or error)

  // Fetch films from the server when component mounts or searchTerm changes
  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true); // Show loading spinner or text
      try {
        // Set endpoint based on whether search is applied
        const url = searchTerm
          ? `http://localhost:5000/films?search=${encodeURIComponent(searchTerm)}`
          : "http://localhost:5000/films";

        const response = await fetch(url);

        // Handle fetch errors
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json(); // Parse JSON response
        setFilms(data); // Save films in state
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong"); // Store error message
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchFilms();
  }, [searchTerm]); // Dependency: re-run if searchTerm changes

  // Handle film rental
  const handleRent = async () => {
    if (!customerId) {
      setRentMessage("Please enter a customer ID.");
      return;
    }

    setRenting(true); // Start rental state

    try {
      const response = await fetch(`http://localhost:5000/rent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          film_id: selectedFilm.film_id, // Film to rent
          customer_id: customerId,       // Customer renting
        }),
      });

      if (!response.ok) throw new Error("Failed to rent film");

      setRentMessage("Film rented successfully!"); // Success message
      setCustomerId(""); // Reset input field
    } catch (err) {
      setRentMessage(err.message || "Something went wrong while renting");
    } finally {
      setRenting(false); // End rental state
    }
  };

  return (
    <div className="films-container">
      <h2>All Films</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by title, genre, or actor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="film-search"
      />

      {/* Loading message */}
      {loading && <p className="message">Loading films...</p>}

      {/* Error message */}
      {error && <p className="message error">{error}</p>}

      {/* No results found */}
      {!loading && !error && films.length === 0 && (
        <p className="message">No films found.</p>
      )}

      {/* Table of films */}
      {!loading && films.length > 0 && (
        <table className="films-table">
          <thead>
            <tr>
              <th>Film ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Release Year</th>
              <th>Genre</th>
              <th>Actor</th>
              <th>Rental Count</th>
            </tr>
          </thead>
          <tbody>
            {films.map((film) => (
              <tr
                key={film.film_id}
                onClick={() => setSelectedFilm(film)} // Open modal on row click
              >
                <td>{film.film_id}</td>
                <td>{film.title}</td>
                <td>{film.description}</td>
                <td>{film.release_year}</td>
                <td>{film.genre || "N/A"}</td>
                <td>{film.actors}</td>
                <td>{film.rental_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal popup for film details and rental */}
      {selectedFilm && (
        <div
          className="film-modal-overlay"
          onClick={() => setSelectedFilm(null)} // Close modal on background click
        >
          <div
            className="film-modal"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicked inside
          >
            {/* Film details */}
            <h3>{selectedFilm.title}</h3>
            <p><strong>Description:</strong> {selectedFilm.description}</p>
            <p><strong>Release Year:</strong> {selectedFilm.release_year}</p>
            <p><strong>Genre:</strong> {selectedFilm.genre}</p>
            <p><strong>Actors:</strong> {selectedFilm.actors}</p>
            <p><strong>Rental Count:</strong> {selectedFilm.rental_count}</p>

            <hr />

            {/* Rental form */}
            <h4>Rent this film</h4>
            <input
              type="text"
              placeholder="Enter Customer ID"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
            <button onClick={handleRent} disabled={renting}>
              {renting ? "Renting..." : "Rent Film"}
            </button>

            {/* Rent success/error message */}
            {rentMessage && <p className="message">{rentMessage}</p>}

            {/* Close modal button */}
            <button
              className="close-btn"
              onClick={() => {
                setSelectedFilm(null);
                setRentMessage(""); // Clear message when closing
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Films;
