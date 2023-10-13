import {FC, useState} from 'react';
import Rating from '../rating/rating';

const CommentForm: FC = () => {
  const [reviewText, setReviewText] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rating, setRating] = useState(0);

  return (
    <form action="#" className="add-review__form">
      <Rating setRating={setRating}/>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          onChange={(e) => setReviewText(e.target.value)}
        >
          {reviewText}
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
};

export default CommentForm;
