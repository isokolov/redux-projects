import { addMovie, addToBasket, addToLikedMovies } from "@/store";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import {
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  RemoveShoppingCart,
} from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

interface RootState {
  movies: { title: string; liked: boolean; inBasket: boolean }[];
  basket: string[];
  likedMovies: string[];
}

function Home() {
  const [movieTitle, setMovieTitle] = useState("");
  const movies = useSelector((state: RootState) => state.movies);
  const basket = useSelector((state: RootState) => state.basket);
  const likedMovies = useSelector((state: RootState) => state.likedMovies);
  const dispatch: Dispatch<any> = useDispatch();

  function handleAddMovie() {
    const newMovie = {
      title: movieTitle,
      inBasket: false,
      liked: false,
    };
    dispatch(addMovie(newMovie));
    setMovieTitle("");
  }

  function handleLikeMovie(movieTitle: string) {
    dispatch(addToLikedMovies(movieTitle));
  }

  function handleAddToBasket(movieTitle: string) {
    dispatch(addToBasket(movieTitle));
  }

  function handleRemoveFromBasket(movieTitle: string) {
    dispatch({ type: "ADD_TO_BASKET", payload: movieTitle });
  }

  return (
    <div className="container">
      <h1 className="title">My Movie List</h1>
      <div className="add-movie">
        <input
          type="text"
          placeholder="Enter a movie title"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          className="input"
        />
        <button onClick={handleAddMovie} className="button">
          Add Movie
        </button>
      </div>
      <h2 className="subtitle">My Movies</h2>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <Card key={index} className="movie-card">
            <CardContent>
              <Typography variant="h5" component="h2">
                {movie.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                startIcon={movie.liked ? <Favorite /> : <FavoriteBorder />}
                onClick={() => handleLikeMovie(movie.title)}
                className="like-button"
              >
                {movie.liked ? "Liked" : "Not Liked"}
              </Button>
              <Button
                startIcon={
                  movie.inBasket ? <RemoveShoppingCart /> : <AddShoppingCart />
                }
                onClick={() => {
                  if (movie.inBasket) {
                    handleRemoveFromBasket(movie.title);
                  } else {
                    handleAddToBasket(movie.title);
                  }
                }}
                className="basket-button"
              >
                {movie.inBasket ? "Remove from basket" : "Add to basket"}
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <h2 className="subtitle">My Basket ({basket.length})</h2>
      <ul className="basket">
        {basket.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
      <h2 className="subtitle">Liked Movies ({likedMovies.length})</h2>
      <ul className="liked-movies">
        {likedMovies.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
