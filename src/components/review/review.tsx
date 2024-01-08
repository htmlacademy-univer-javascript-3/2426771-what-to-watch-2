import {FC} from 'react';
import { Comment } from '../../types/film/index';

interface Props {
  review: Comment;
}

export const ReviewCard: FC<Props> = ({review}) => (
  <div
    className="review"
  >
    <blockquote className="review__quote">
      <p className="review__text">{review.comment}</p>

      <footer className="review__details">
        <cite className="review__author">{review.user}</cite>
        <time className="review__date" dateTime={review.date}>{review.date}</time>
      </footer>
    </blockquote>

    <div className="review__rating">{review.rating}</div>
  </div>
);
