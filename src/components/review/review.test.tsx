import { render, screen } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import { ReviewCard } from './review';
import { createMemoryHistory } from 'history';

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {
    const review = {
      id: '',
      date: 'date',
      user: 'user',
      comment: 'comment',
      rating: 4
    };

    const Component = withRouter(<ReviewCard review={review} />, createMemoryHistory());
    render(Component);

    expect(screen.getByText(review.comment));
    expect(screen.getByText(review.date));
    expect(screen.getByText(review.rating));
    expect(screen.getByText(review.user));
  });
});
