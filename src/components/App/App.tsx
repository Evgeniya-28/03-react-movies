import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import toast from "react-hot-toast";
import styles from "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  async function handleSearch(query: string) {
    if (!query.trim()) {
      toast("Please enter your search query.");
      return;
    }

    setMovies([]);
    setError(false);
    setLoading(true);

    try {
      const result = await fetchMovies(query);
      if (!result.length) {
        toast("No movies found for your request.");
      }
      setMovies(result);
    } catch (err) {
      setError(true);
      console.error(err);
      toast.error("There was an error, please try again...");
    } finally {
      setLoading(false);
    }
  }

  function handleSelectMovie(movie: Movie) {
    setSelectedMovie(movie);
  }

  function handleCloseModal() {
    setSelectedMovie(null);
  }

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      <main className={styles.main}>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {!loading && !error && (
          <MovieGrid movies={movies} onSelect={handleSelectMovie} />
        )}
      </main>

      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
}
