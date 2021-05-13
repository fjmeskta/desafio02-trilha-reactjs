import React from "react";
import '../styles/content.scss';

import { ContentHeader } from "./ContentHeader";
import { ContentMain } from "./ContentMain";
import { useGenre } from "../contexts/GenreContext";

export function Content() {
  const { movies, selectedGenre } = useGenre();
  return (
    <div className="container">
      <ContentHeader title={selectedGenre.title} />
      <ContentMain movies={movies} />
    </div>
  );
}