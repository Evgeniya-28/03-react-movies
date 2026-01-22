import axios from "axios";
import type { Movie } from "../types/movie";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

interface FetchMoviesResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await api.get<FetchMoviesResponse>("/search/movie", {
    params: {
      query,
      page: 1,
      include_adult: false,
      language: "en-US",
    },
  });

  return response.data.results;
}
