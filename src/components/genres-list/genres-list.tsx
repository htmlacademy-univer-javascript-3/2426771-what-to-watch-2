import { FC, useEffect } from 'react';
import { useHash } from '../../hooks/use-hash';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { genreChanged } from '../../store/reducers/filters/filters';

interface Props {
  genres: string[];
}

interface Genre {
  genre: string;
  href?: string;
}

export const GenresList: FC<Props> = ({ genres }) => {
  const hash = useHash<string>();
  const dispatch = useAppDispatch();

  const allGenres: Genre[] = [
    {
      genre: 'All genres',
      href: '',
    },
    ...genres.map((g) => ({ genre: g, href: g })),
  ];

  useEffect(() => {
    dispatch(genreChanged(hash));
  }, [hash]);

  return (
    <ul className="catalog__genres-list">
      {allGenres.map((genre) => (
        <li
          key={genre.genre}
          className={[
            'catalog__genres-item',
            hash === genre.href ? 'catalog__genres-item--active' : undefined,
          ].join(' ')}
        >
          <Link to={`#${genre.href ?? ''}`} className="catalog__genres-link">
            {genre.genre}
          </Link>
        </li>
      ))}
    </ul>
  );
};
