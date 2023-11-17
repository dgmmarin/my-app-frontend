import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RolesPermissions from './RolesPermissions';

describe('<RolesPermissions />', () => {
  test('it should mount', () => {
    render(<RolesPermissions />);
    
    const rolesPermissions = screen.getByTestId('RolesPermissions');

    expect(rolesPermissions).toBeInTheDocument();
  });
});