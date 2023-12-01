import {FC, useEffect, useState} from 'react';
import { Review } from '../../types/review';
import { ReviewCard } from '../review/review';

interface Props {
  filmId: string;
}

export const FilmTabReviews: FC<Props> = ({filmId}) => {
  const col1 = [];
  const col2 = [];

  const [reviews, setReviews] = useState<Review[]>([]);

  const onLoad = async () => {
    // const reviewsRes = await fetchReviews(filmId);
    // setReviews(reviewsRes);
  };

  useEffect(() => {
    onLoad();
  });


  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    if (i % 2) {
      col2.push(review);
    } else {
      col1.push(review);
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
