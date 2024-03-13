import PropTypes from "prop-types";
import { useState } from "react";

const Card = ({ movie, handleFavorites, filterByGenre }) => {
  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };
  const [isAdded, setIsAdded] = useState(() => {
    const storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];
    return storedData.includes(movie.id.toString());
  });

  const genreFinder = () => {
    if (!movie.genre_ids) return null;

    const genreMap = {
      28: "Action",
      12: "Aventure",
      16: "Animation",
      35: "Comédie",
      80: "Policier",
      99: "Documentaire",
      18: "Drame",
      10751: "Famille",
      14: "Fantasy",
      36: "Histoire",
      27: "Horreur",
      10402: "Musique",
      9648: "Mystère",
      10749: "Romance",
      878: "Science-fiction",
      10770: "Téléfilm",
      53: "Thriller",
      10752: "Guerre",
      37: "Western",
    };
    return movie.genre_ids.map((id, index) => (
      <li key={`${id}-${index}`} onClick={() => filterByGenre(id)}>{genreMap[id]}</li>
    ));
  };

  const addStorage = () => {
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    if (!storedData.includes(movie.id.toString())) {
      storedData.push(movie.id.toString());
      window.localStorage.movies = storedData.join(",");
      setIsAdded(true);
    }
  };

  const deleteStorage = () => {
    let storedData = window.localStorage.movies.split(",");
    let newData = storedData.filter((id) => id !== movie.id.toString());

    window.localStorage.movies = newData.join(",");
    if (handleFavorites) handleFavorites(movie.id);
  };

  return (
    <div className="card">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
            : "/cine-app-vite/poster.webp"
        }
        onError={(e) => (e.currentTarget.src = "/cine-app-vite/poster.webp")}
        alt={`affiche ${movie.title}`}
      />
      <h2>{movie.title}</h2>
      {movie.release_date && (
        <h5>Sorti le : {dateFormater(movie.release_date)}</h5>
      )}
      <h4>
        {movie.vote_average.toFixed(1)}/10 <span>⭐</span>
      </h4>

      <ul>{genreFinder()}</ul>

      {movie.overview && (
        <>
          <h3>Synopsis</h3>
          <p>{movie.overview}</p>
        </>
      )}

      {movie.genre_ids ? (
        <button className="btn" onClick={addStorage}>
          {isAdded ? "Ajouté 👍" : "Ajouter 🩷"}
        </button>
      ) : (
        <button className="btn" onClick={deleteStorage}>
          Supprimer
        </button>
      )}
    </div>
  );
};

Card.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number.isRequired,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    overview: PropTypes.string,
  }).isRequired,
  handleFavorites: PropTypes.func,
  filterByGenre: PropTypes.func.isRequired,
};

export default Card;
