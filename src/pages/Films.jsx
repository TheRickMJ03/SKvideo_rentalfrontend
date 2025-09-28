import React, { useEffect, useState } from "react";

const Films = () => {
  const [films, setFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch films, optionally filtered by searchTerm
  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true);
      try {
        const url = searchTerm
          ? `http://localhost:5000/films?search=${encodeURIComponent(searchTerm)}`
          : "http://localhost:5000/films";

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setFilms(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    // Debounce or just call directly
    fetchFilms();
  }, [searchTerm]);

  return (
    <div>
      <h2>All Films</h2>

      <input
        type="text"
        placeholder="Search by title, genre, or actor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      />

      {loading && <p>Loading films...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && films.length === 0 && <p>No films found.</p>}

      {!loading && films.length > 0 && (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
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
              <tr key={film.film_id}>
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
    </div>
  );
};

export default Films;
