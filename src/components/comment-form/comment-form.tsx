import {FC, useState} from 'react';
import Rating from '../rating/rating';
import { APIRoute } from '../../config/api/routes';
import { api } from '../../config/api/api';
import { useParams } from 'react-router-dom';

const CommentForm: FC<{ backgroundColor: string | undefined }> = (props) => {
  const {id} = useParams();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const sendComment = async () => {
    if (id === undefined) {
      throw 'id empty';
    }
    await api.post<Comment>(`${APIRoute.SendComment}/${id}`, {comment: reviewText, rating});
  };

  const handleSubmitClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    sendComment();
  };

  return (
    <form action="#" className="add-review__form">
      <Rating setRating={setRating}/>

      <div className="add-review__text" style={{backgroundColor: props.backgroundColor, filter: 'brightness(1.2)'}}>
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          onChange={(e) => setReviewText(e.target.value)}
          value={reviewText}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" onClick={handleSubmitClick}>Post</button>
        </div>

      </div>
    </form>
  );
};

export default CommentForm;
