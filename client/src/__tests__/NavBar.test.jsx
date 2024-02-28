import React from 'react';
import "@testing-library/jest-dom";
import { render, fireEvent } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar Component', () => {
    it('renders the logo correctly', () => {
      const { getByAltText } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
      );
      const logo = getByAltText('Moringa Pair');
      expect(logo).toBeInTheDocument();
    });
});