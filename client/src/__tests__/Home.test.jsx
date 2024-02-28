import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from '../pages/Home';
import { MemoryRouter } from 'react-router-dom';

test('renders home component without crashing', () => { 
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );
 });


test('clicking sign up button navigates to signup route', () => { 
    const { getByText } = render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );
    const signUpButton = getByText('Sign up');
    fireEvent.click(signUpButton)
});