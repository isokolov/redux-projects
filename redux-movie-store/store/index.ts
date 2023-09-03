import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  title: string;
  inBasket: boolean;
  likedMovies: boolean;
}

interface MovieState {
  movies: Movie[];
  basket: string[];
  likedMovies: string[];
}

const initialState: MovieState = {
  movies: [
    { title: "The Godfather", inBasket: false, liked: false },
    { title: "The Shawshank Redemption", inBasket: false, liked: false },
    { title: "The Dark Knight", inBasket: false, liked: false },
  ],
  basket: [],
  likedMovies: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
    },
    addToBasket: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.map((movie) => {
        if (movie.title === action.payload) {
          return { ...movie, inBasket: !movie.inBasket };
        }
        return movie;
      });
      if (state.basket.includes(action.payload)) {
        state.basket = state.basket.filter((movie) => movie !== action.payload);
      } else {
        state.basket.push(action.payload);
      }
    },
    addToLikedMovies: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.map((movie) => {
        if (movie.title === action.payload) {
          return { ...movie, liked: !movie.liked };
        }
        return movie;
      });
      if (state.likedMovies.includes(action.payload)) {
        state.likedMovies = state.likedMovies.filter(
          (movie) => movie !== action.payload
        );
      } else {
        state.likedMovies.push(action.payload);
      }
    },
  },
});

// function reducer(state = initialState, action) {
//   switch (action.type) {
//     case "ADD_MOVIE":
//       return {
//         ...state,
//         movies: [...state.movies, action.payload],
//       };
//     case "ADD_TO_BASKET":
//       return {
//         ...state,
//         // it finds the match of the movie and switches it if it is a match
//         movies: state.movies.map((movie) =>
//           movie.title === action.payload
//             ? { ...movie, inBasket: !movie.inBasket }
//             : movie
//         ),
//         // if it's already there don't add it otherwise add it
//         basket: state.basket.includes(action.payload)
//           ? state.basket.filter((movie) => movie !== action.payload)
//           : [...state.basket, action.payload],
//       };
//     case "LIKE_MOVIE":
//       return {
//         ...state,
//         movies: state.movies.map((movie) =>
//           movie.title === action.payload
//             ? { ...movie, liked: !movie.liked }
//             : movie
//         ),
//         likedMovies: state.likedMovies.includes(action.payload)
//           ? state.likedMovies.filter((movie) => movie !== action.payload)
//           : [...state.likedMovies, action.payload],
//       };
//     default:
//       return state;
//   }
// }

const store = configureStore({ reducer: movieSlice.reducer });

export const { addMovie, addToBasket, addToLikedMovies } = movieSlice.actions;
export default store;
