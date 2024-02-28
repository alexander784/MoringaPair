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

    it('renders navigation links correctly', () => {
      const { getByText } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>);
  
  expect(getByText('Students')).toBeInTheDocument();
  expect(getByText('Pairs')).toBeInTheDocument();
  expect(getByText('Signup')).toBeInTheDocument();
  expect(getByText('Login')).toBeInTheDocument();
      
    });
});