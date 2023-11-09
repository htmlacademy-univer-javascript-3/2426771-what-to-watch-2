import {FC} from 'react';
import { Review } from '../../types/review';

interface Props {
    review: Review;
}

export const ReviewCard: FC<Props> = ({review}) => (
  <div
    className="review"
  >
    <blockquote className="review__quote">
      <p className="review__text">{review.text}</p>

      <footer className="review__details">
        <cite className="review__author">{review.username}</cite>
        <time className="review__date" dateTime="2015-11-18">{review.date}</time>
      </footer>
    </blockquote>

    <div className="review__rating">{review.rating}</div>
  </div>
);
