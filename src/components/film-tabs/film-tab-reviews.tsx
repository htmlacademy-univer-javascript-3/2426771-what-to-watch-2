import { FC, useEffect } from 'react';
import { ReviewCard } from '../review/review';
import { fetchComments, fetchFilm } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getComments } from '../../store/reducers/comments';
import { useAppSelector } from '../../hooks/use-app-selector';

interface Props {
  filmId: string;
}

export const FilmTabReviews: FC<Props> = ({filmId}) => {
  const col1 = [];
  const col2 = [];
  const dispatch = useAppDispatch();
  const comments = useAppSelector(getComments);

  useEffect(() => {
    dispatch(fetchComments(filmId));
  }, []);


  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    if (i % 2) {
      col2.push(comment);
    } else {
      col1.push(comment);
    }
  }

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {col1.map((review) => <ReviewCard key={review.id} review={review}/>)}
      </div>
      <div className="film-card__reviews-col">
        {col2.map((review) => <ReviewCard key={review.id} review={review}/>)}
      </div>
    </div>
  );
};
