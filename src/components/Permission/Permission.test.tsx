import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Permission from './Permission';

describe('<Permission />', () => {
  test('it should mount', () => {
    render(<Permission />);
    
    const permission = screen.getByTestId('Permission');

    expect(permission).toBeInTheDocument();
  });
});