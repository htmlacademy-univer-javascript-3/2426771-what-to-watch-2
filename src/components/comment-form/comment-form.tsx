import {FC, useState} from 'react';
import Rating from '../rating/rating';
import { APIRoute } from '../../config/api/routes';
import { api } from '../../config/api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from '../../config/route';

const CommentForm: FC<{ backgroundColor: string | undefined }> = (props) => {
  const {id} = useParams();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [sending, setSending] = useState(false);

  const navigate = useNavigate();

  const sendComment = async () => {
    try {
      setSending(true);
      if (id === undefined) {
        throw 'id empty';
      }
      await api.post<Comment>(`${APIRoute.SendComment}/${id}`, {comment: reviewText, rating});
      navigate(RoutePaths.Film.replace(':id', id));
    } catch (error) {
      setSending(false);
      setReviewText((text) => `${text } ошибка!`);
    }
  };

  const isFormValid = reviewText.length > 50 && reviewText.length < 400 && rating !== 0 && !sending;

  const handleSubmitClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (isFormValid) {
      sendComment();
    }
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
          <button className="add-review__btn" type="submit" disabled={!isFormValid} onClick={handleSubmitClick}>Post</button>
        </div>

      </div>
    </form>
  );
};

export default CommentForm;
