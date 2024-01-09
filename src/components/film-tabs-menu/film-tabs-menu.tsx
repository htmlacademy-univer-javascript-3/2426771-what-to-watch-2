import { FC } from 'react';
import { FilmTabs } from '../../types/film-tab/index';
import { Link } from 'react-router-dom';
import { useHash } from '../../hooks/use-hash/use-hash';

type Tab = {
  key: FilmTabs;
  title: string;
  active: boolean;
};

const FilmTabsMenu: FC = () => {
  const hash = useHash<FilmTabs>();

  const tabList: Tab[] = [
    {
      key: FilmTabs.Overview,
      title: 'Overview',
      active: FilmTabs.Overview === hash,
    },
    {
      key: FilmTabs.Details,
      title: 'Details',
      active: FilmTabs.Details === hash,
    },
    {
      key: FilmTabs.Reviews,
      title: 'Reviews',
      active: FilmTabs.Reviews === hash,
    },
  ];

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {tabList.map((t) => (
          <li
            key={t.key}
            className={`film-nav__item ${
              t.active ? 'film-nav__item--active' : ''
            }`}
          >
            <Link to={`#${t.key}`} className="film-nav__link">
              {t.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FilmTabsMenu;
