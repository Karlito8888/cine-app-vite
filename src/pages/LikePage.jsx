import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Card from "../components/Card";

const LikePage = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const moviesIds = window.localStorage.movies
        ? window.localStorage.movies.split(",")
        : [];

      const moviesPromises = moviesIds.map((id) =>
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=fr-FR`
        )
      );

      try {
        const moviesResponses = await Promise.all(moviesPromises);
        const movies = moviesResponses.map((response) => response.data);
        setListData(movies);
      } catch (error) {
        console.error("Erreur lors du chargement des favoris:", error);
      }
    };

    fetchFavorites();
  }, []);

  const removeMovieFromFavorites = (movieId) => {
    const filteredData = listData.filter(
      (movie) => movie.id.toString() !== movieId.toString()
    );
    setListData(filteredData);

    const storedData = window.localStorage.movies.split(",");
    const newData = storedData.filter((id) => id !== movieId.toString());
    window.localStorage.movies = newData.join(",");
  };

  return (
    <div className="user-list-page">
      <Header />
      <h2>
        Coups de coeur <span>💖</span>
      </h2>
      <div className="result">
        {listData.length > 0 ? (
          listData.map((movie) => (
            <Card
              movie={movie}
              key={movie.id}
              handleFavorites={() => removeMovieFromFavorites(movie.id)}
            />
          ))
        ) : (
          <h2>Aucun coup de coeur pour le moment</h2>
        )}
      </div>
    </div>
  );
};

export default LikePage;
