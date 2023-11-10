import { RatingLevel } from '../types/rating-level';

export function getRatingLevel(rating: number) {
  if (rating === 10) {
    return RatingLevel.Awesome;
  } else if (rating > 8) {
    return RatingLevel.VeryGood;
  } else if (rating > 5) {
    return RatingLevel.Good;
  }else if (rating > 3) {
    return RatingLevel.Normal;
  } else {
    return RatingLevel.Bad;
  }
}
