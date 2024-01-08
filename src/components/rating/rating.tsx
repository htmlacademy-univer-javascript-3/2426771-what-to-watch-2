import React from 'react';
import {FC} from 'react';

interface RatingProps {
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const ratingStars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse();

const Rating: FC<RatingProps> = ({setRating}) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setRating(Number(e.target.value));
    }
  };

  return (
    <div className="rating">
      <div className="rating__stars">
        {ratingStars.map((i) => (
          <React.Fragment key={i}>
            <input
              className="rating__input"
              id={`star-${i}`}
              type="radio"
              name="rating"
              value={i}
              onChange={onChangeHandler}
            />
            <label className="rating__label" htmlFor={`star-${i}`}>Rating {i}</label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Rating;
