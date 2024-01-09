import { render, screen } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import Rating from './rating';
import { createMemoryHistory } from 'history';

describe('Component: Rating', () => {
  it('should render correctly', () => {
    const setRating = (value: number) => value;

    const Component = withRouter(<Rating setRating={setRating} />, createMemoryHistory());
    render(Component);

    for (let i = 1; i < 11; i++) {
      expect(screen.getAllByLabelText(`Rating ${i}`));
    }
  });
});
