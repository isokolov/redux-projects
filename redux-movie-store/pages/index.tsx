import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../store";

export default function Home() {
  const [movieTitle, setMovieTitle] = useState("");
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const basket = useSelector((state) => state.basket);
  const likedMovies = useSelector((state) => state.likedMovies);
  function handleAddMovie() {
    dispatch({ type: "ADD_MOVIE", payload: movieTitle });
  }

  function handleLikeMovie() {
    dispatch({ type: "LIKED_MOVIE", payload: movieTitle });
  }

  function handleAddBasket() {
    dispatch({ type: "ADD_TO_BASKET", payload: movieTitle });
  }

  console.log(store.getState());
  return (
    <>
      <div>
        <h1>My Movie List</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter a movie title"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>
      <h2>Movies</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            {movie}
            <button onClick={handleLikeMovie}>Like</button>
            <button onClick={handleAddBasket}>Add to Basket</button>
          </li>
        ))}
      </ul>
      <h2>My Basket {basket.length}</h2>
      <ul>
        {basket.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
      <h2>Liked Movies {likedMovies.length}</h2>
      <ul>
        {likedMovies.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </>
  );
}
