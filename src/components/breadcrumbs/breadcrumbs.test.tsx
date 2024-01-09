import Breadcrumbs from './breadcrumbs';
import { Breadcrumbs as BreadcrumbsType } from '../../types/breadcrumbs';
import { render, screen } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import { createMemoryHistory } from 'history';

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    const expectedTextChild1 = 'child1';
    const expectedTextChild2 = 'child2';

    const breadcrumbs: BreadcrumbsType = {
      links: [{title: 'child1', link: 'http://localhost:3001/link1'}],
      lastChild: 'child2'
    };
    
    const Component = withRouter(<Breadcrumbs breadcrumbs={breadcrumbs} />, createMemoryHistory());

    render(Component);

    expect(screen.getByText(expectedTextChild1)).toBeInTheDocument();
    expect(screen.getByText(expectedTextChild2)).toBeInTheDocument();
  });
});
