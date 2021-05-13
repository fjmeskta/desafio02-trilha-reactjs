import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';
interface Genre {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}
interface GenreContextData {
  genres: Genre[];
  movies: Movie[];
  selectedGenre: Genre;
  selectedGenreId: number;
  handleClickButton: (id: number) => void;
}
export const GenreContext = createContext({} as GenreContextData);

export const useGenre = () => {
  return useContext(GenreContext);
}

interface GenreContextProviderProps {
  children: ReactNode;
}

export function GenreContextProvider({ children }: GenreContextProviderProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<Genre>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);


  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <GenreContext.Provider value={{
      genres,
      movies,
      selectedGenre,
      selectedGenreId,
      handleClickButton

    }}>
      {children}
    </GenreContext.Provider>
  );
}