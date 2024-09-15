import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  

function Movie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 
  const API_KEY = 'af1cf641'; 

  
  const randomSearchTerms = ['Batman', 'Matrix', 'Avengers', 'Spiderman', 'Inception', 'Star Wars', 'Harry Potter', 'Terminator', 'Jurassic', 'Superman', 'Alien', 'Predator', 'Mission', 'Pirates', 'Toy Story'];

  const fetchMovies = async (term = '') => {
    setLoading(true);
    let allMovies = [];

    if (term) {
      const API_URL = `https://www.omdbapi.com/?s=${term}&apikey=${API_KEY}`;
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.Response === 'True') {
          allMovies = data.Search.slice(0, 16); 
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    } else {
      for (let i = 0; i < randomSearchTerms.length && allMovies.length < 16; i++) {
        const randomTerm = randomSearchTerms[i];
        const API_URL = `https://www.omdbapi.com/?s=${randomTerm}&apikey=${API_KEY}`;
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          if (data.Response === 'True') {
            allMovies = allMovies.concat(data.Search.slice(0, 16 - allMovies.length)); 
          }
        } catch (error) {
          console.error('Error fetching random movies:', error);
        }
      }
    }

    setMovies(allMovies);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(); 
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchTerm); 
  };

  return (
    <div className="movie-container">
      <h2>Search Movies</h2>

      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter movie title"
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {loading ? (
        <p>Loading movies...</p>
      ) : movies.length > 0 ? (
        <ul className="movie-list">
          {movies.map((movie) => (
            <li key={movie.imdbID} className="movie-item">
              <Link to={`/movie/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                <h3>{movie.Title}</h3>
              </Link>
              <p>Year: {movie.Year}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}

export default Movie;
