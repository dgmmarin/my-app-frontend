import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginRegister from './LoginRegister';

describe('<LoginRegister />', () => {
  test('it should mount', () => {
    render(<LoginRegister />);
    
    const loginRegister = screen.getByTestId('LoginRegister');

    expect(loginRegister).toBeInTheDocument();
  });
});