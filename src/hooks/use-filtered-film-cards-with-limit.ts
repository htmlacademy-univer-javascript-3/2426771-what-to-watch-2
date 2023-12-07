import { useMemo } from 'react';
import { FilmCard } from '../types/film';
import { useAppSelector } from './use-app-selector';
import { getGenre } from '../store/reducers/filters';

export const useFilteredFilmCardsWithLimit = (filmCards: FilmCard[], limit: number) => {
  const genre = useAppSelector(getGenre);
  const genres = useMemo(() => Array.from(new Set(filmCards.map((f) => f.genre))), [filmCards]);

  const filteredFilmCards = useMemo(() => {
    if (!genre) {
      return filmCards;
    }
    return filmCards.filter((f) => f.genre === genre);
  }, [filmCards, genre]);

  const filteredFilmCardsWithLimit = useMemo(() => filteredFilmCards.slice(0, limit), [filteredFilmCards, limit]);

  return {
    genre,
    genres,
    fullLength: filteredFilmCards.length,
    filteredFilmCardsWithLimit
  };
};
