import { render, screen } from '@testing-library/react';
import CommentForm from './comment-form';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { RoutePaths } from '../../config/route';
import MockAdapter from 'axios-mock-adapter';
import { api } from '../../config/api/api';
import { APIRoute } from '../../config/api/routes';

describe('Component: CommentForm', () => {
  it('should render correctly', () => {
    const mockAxiosAdapter = new MockAdapter(api);
    mockAxiosAdapter.onPost(`${APIRoute.SendComment}/1`).reply(200);
    const Component = (
      <MemoryRouter initialEntries={[RoutePaths.Film.replace(':id', '1')]}>
        <Routes>
          <Route path={RoutePaths.Film} element={<CommentForm backgroundColor={'#202020'} />}/>
        </Routes>
      </MemoryRouter>
    );

    render(Component);

    expect(screen.getByText('Rating 2')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    screen.getByRole('button').click();
  });
});
