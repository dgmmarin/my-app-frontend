import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrderShow from './OrderShow';

describe('<OrderShow />', () => {
  test('it should mount', () => {
    render(<OrderShow />);
    
    const orderShow = screen.getByTestId('OrderShow');

    expect(orderShow).toBeInTheDocument();
  });
});