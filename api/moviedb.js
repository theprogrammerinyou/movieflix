import axios from "axios";
import { apiKey } from "../constants";

// endpoints
const apiBaseUrl = "https://api.themoviedb.org/3";
const fetchMoviesEndpoint = `${apiBaseUrl}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=1&vote_count_gte=100&include_video=true`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}&sort_by=popularity.desc&page=1&vote_count_gte=100&include_video=true`;

// endpoints with dynamic params

// movie
const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

// person
const personDetailsEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

// functions to get images of different widths, (show images using these to improve the loading times)
export const image500 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w500" + posterPath : null;
export const image342 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w342" + posterPath : null;
export const image185 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w185" + posterPath : null;

// fallback images
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

const apiCall = async (endpoint, fetchYear, params) => {
  const options = {
    method: "GET",
    url: endpoint + `&primary_release_year=${fetchYear}`,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return {};
  }
};

// home screen apis
export const fetchMoviesList = (fetchYear) => {
  return apiCall(fetchMoviesEndpoint, fetchYear);
};

// movie screen apis
export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};
export const fetchMovieCredits = (movieId) => {
  return apiCall(movieCreditsEndpoint(movieId));
};
export const fetchSimilarMovies = (movieId) => {
  return apiCall(similarMoviesEndpoint(movieId));
};

// person screen apis
export const fetchPersonDetails = (personId) => {
  return apiCall(personDetailsEndpoint(personId));
};
export const fetchPersonMovies = (personId) => {
  return apiCall(personMoviesEndpoint(personId));
};

// search screen apis
export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};
