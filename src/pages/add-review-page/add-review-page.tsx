import {FC} from 'react';
import { Film } from '../../types/film';
import Header from '../../components/header/header';
import { RoutePaths, getRoutePath } from '../../config/route';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CommentForm from '../../components/comment-form/comment-form';

type AddReviewPageProps = {
  film: Film;
}

const AddReviewPage: FC<AddReviewPageProps> = ({film: {name, id}}) => (
  <section className="film-card film-card--full">
    <div className="film-card__header">
      <div className="film-card__bg">
        <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header>
        <Breadcrumbs
          breadcrumbs={{
            links: [
              {
                title: name,
                link: getRoutePath(RoutePaths.Film, {id})
              }
            ],
            lastChild: 'Add review'
          }}
        />
      </Header>

      <div className="film-card__poster film-card__poster--small">
        <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
      </div>
    </div>

    <div className="add-review">
      <CommentForm />
    </div>

  </section>
);

export default AddReviewPage;
