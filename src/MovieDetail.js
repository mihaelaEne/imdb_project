import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 

function MovieDetail() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = 'af1cf641'; 
  const API_URL = `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching movie details:', error));
  }, [id]);

  if (loading) return <p>Loading movie details...</p>;

  return movie ? (
    <div className="movie-detail">
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Rated:</strong> {movie.Rated}</p>
      <p><strong>Released:</strong> {movie.Released}</p>
      <p><strong>Runtime:</strong> {movie.Runtime}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
    </div>
  ) : (
    <p>Movie not found</p>
  );
}

export default MovieDetail;
