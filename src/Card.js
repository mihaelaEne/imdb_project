function Card({ movie }) {
  return (
    <li className="movie-item">
      <div className="movie-details">
        <h3>{movie.Title}</h3>
        <p className="year">Year: {movie.Year}</p>
        <p className="rated">Rated: {movie.Rated}</p>
        <p className="released">Released: {movie.Released}</p>
        <p className="runtime">Runtime: {movie.Runtime}</p>
      </div>
    </li>
  );
}

export default Card;
