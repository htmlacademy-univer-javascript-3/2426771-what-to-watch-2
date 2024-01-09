import { render, screen } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import { PlayButton } from './play-button';
import { createMemoryHistory } from 'history';

describe('Component: PlayButton', () => {
  it('should render correctly', () => {
    const expectedText = 'Play';
    const id = 'idid1';

    const Component = withRouter(<PlayButton id={id} />, createMemoryHistory());

    render(Component);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', `/player/${id}`);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
