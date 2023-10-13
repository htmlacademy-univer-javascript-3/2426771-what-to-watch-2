import {FC} from 'react';
import { Breadcrumbs as BreadcrumbsType } from '../../types/breadcrumbs';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbsType;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({breadcrumbs}) => (
  <nav className="breadcrumbs">
    <ul className="breadcrumbs__list">
      {breadcrumbs.links.map((breadcrumb) => (
        <li key={breadcrumb.link} className="breadcrumbs__item">
          <Link to={breadcrumb.link} className="breadcrumbs__link">{breadcrumb.title}</Link>
        </li>
      ))}
      <a className="breadcrumbs__link">{breadcrumbs.lastChild}</a>
    </ul>
  </nav>
);

export default Breadcrumbs;
