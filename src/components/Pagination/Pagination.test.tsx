import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pagination from './Pagination';

describe('<Pagination />', () => {
  test('it should mount', () => {
    render(<Pagination perPage={0} currentPage={0} totalPages={0} setPage={() => { }} />);

    const pagination = screen.getByTestId('Pagination');

    expect(pagination).toBeInTheDocument();
  });
});