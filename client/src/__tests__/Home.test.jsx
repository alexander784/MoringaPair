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
 