import { FC, useEffect } from 'react';
import { ReviewCard } from '../review/review';
import { fetchComments } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { getComments } from '../../store/reducers/comments/comments';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';

interface Props {
  filmId: string;
}

export const FilmTabReviews: FC<Props> = ({ filmId }) => {
  const commentColumn1 = [];
  const commentColumn2 = [];
  const dispatch = useAppDispatch();
  const comments = useAppSelector(getComments);

  useEffect(() => {
    dispatch(fetchComments(filmId));
  }, []);

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    if (i % 2) {
      commentColumn2.push(comment);
    } else {
      commentColumn1.push(comment);
    }
  }

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {commentColumn1.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <div className="film-card__reviews-col">
        {commentColumn2.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};
