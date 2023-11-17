import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrderItem from './OrderItem';

describe('<OrderItem />', () => {
  test('it should mount', () => {
    render(<OrderItem />);
    
    const orderItem = screen.getByTestId('OrderItem');

    expect(orderItem).toBeInTheDocument();
  });
});