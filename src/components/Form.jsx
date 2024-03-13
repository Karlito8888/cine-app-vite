import axios from "axios";
import { useState, useEffect} from "react";
import Card from "./Card";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("e");
  const [sortGoodBad, setSortGoodBad] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

 useEffect(() => {
   axios
     .get(
       `https://api.themoviedb.org/3/search/movie?api_key=${
         import.meta.env.VITE_API_KEY
       }&query=${search}&language=fr-FR`
     )
     .then((res) => setMoviesData(res.data.results));
 }, [search]);

  const filterByGenre = (genreId) => {
    setSelectedGenre(genreId);
  };

const filteredMovies = selectedGenre
  ? moviesData.filter((movie) => movie.genre_ids.includes(selectedGenre))
  : moviesData;

  return (
    <div className="form-component">
      <div className="form-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Entrez le titre d'un film"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input type="submit" value="Rechercher" />
        </form>
        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoodBad("goodToBad")}
          >
            Top<span>➜</span>
          </div>
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoodBad("badToGood")}
          >
            Flop<span>➜</span>
          </div>
        </div>
      </div>
      <div className="result">
        {filteredMovies
          .slice(0, 24)
          .sort((a, b) => {
            if (sortGoodBad === "goodToBad") {
              return b.vote_average - a.vote_average;
            } else if (sortGoodBad === "badToGood") {
              return a.vote_average - b.vote_average;
            }
            return 0;
          })
          .map((movie) => (
            <Card movie={movie} key={movie.id} filterByGenre={filterByGenre} />
          ))}
      </div>
    </div>
  );
};

export default Form;
